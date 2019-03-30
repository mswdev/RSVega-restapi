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
        postCreateBot(response.text).then(function (response) {
            console.log("We made it");
            return res.json(response, req.body.username, req.body.password)
        }).catch(function (error) {
            return res.json(error)
        })
    });
});

function getRecaptchaKey() {
    return client.decodeRecaptchaV2({
        googlekey: google_key,
        pageurl: create_bot_url
    });
}

function postCreateBot(captcha_key, username, password) {
    request(create_bot_url, {
        email1: 'rspeerdev101@gmail.com',
        onlyOneEmail: username,
        password1: password,
        onlyOnePassword: '1',
        day: '27',
        month: '07',
        year: '1998',
        'create-submit': 'create',
        'g-recaptcha-response': captcha_key,
    })
}

module.exports = router;