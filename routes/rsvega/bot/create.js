const express = require('express');
const body_parser = require('body-parser');
const request = require('request');
const two_captcha_client = require('@infosimples/node_two_captcha');

const captcha_api_key = 'fe920f0af037e534bb8180f0dbdec403';
const google_key = '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv';
const create_bot_url = 'https://secure.runescape.com/m=account-creation/create_account';

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

const client = new two_captcha_client(captcha_api_key, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false
});

router.get('/rsvega/bot/create', (req, res) => {
    getRecaptchaKey().then(function (response) {
        request(null, {
            method: 'POST',
            url: create_bot_url,
            form: {
                email1: req.body.email,
                onlyOneEmail: '1',
                password1: req.body.password,
                onlyOnePassword: '1',
                day: '27',
                month: '07',
                year: '1998',
                'create-submit': 'create',
                'g-recaptcha-response': response.text,
            }
        }, function (error, response, body) {
            if (error) throw error;
            //console.log(body.includes("This email address has already been used to play."));
            reportBadCaptcha(body)
            return res.send(body.includes('You can now begin your adventure with your new account.'))
        })
    });
});

function getRecaptchaKey() {
    return client.decodeRecaptchaV2({
        googlekey: google_key,
        pageurl: create_bot_url
    }).catch(function (error) {
        return error;
    });
}

function reportBadCaptcha(body) {
    console.log(body)
}

module.exports = router;