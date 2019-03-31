const express = require('express');
const body_parser = require('body-parser');
const request = require('request');
const two_captcha_client = require('@infosimples/node_two_captcha');
const username_generator = require('username-generator');

const captcha_api_key = 'fe920f0af037e534bb8180f0dbdec403';
const google_key = '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv';
const create_bot_url = 'https://secure.runescape.com/m=account-creation/create_account';

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

const client = new two_captcha_client(captcha_api_key, {
    timeout: 65000,
    polling: 4000,
    throwErrors: false
});

router.get('/rsvega/bot/create', (req, res) => {
    var email = setEmail(req.body.email);
    var password = setPassword(req.body.password);

    console.log(email);
    console.log(password);

    /*getRecaptchaKey().then(function (response) {
        request(null, {
            method: 'POST',
            url: create_bot_url,
            form: {
                email1: email,
                onlyOneEmail: '1',
                password1: password,
                onlyOnePassword: '1',
                day: getRandomDay(),
                month: getRandomMonth(),
                year: getRandomYear(),
                'create-submit': 'create',
                'g-recaptcha-response': response.text,
            }
        }, function (error, response, body) {
            if (error) throw error;
            reportBadCaptcha(body, response.text);
            return res.json({success: body.length === 0})
        })
    })*/
});

function getRecaptchaKey() {
    return client.decodeRecaptchaV2({
        googlekey: google_key,
        pageurl: create_bot_url
    }).catch(function (error) {
        return error
    })
}

function reportBadCaptcha(body, captcha_id) {
    if (body.length > 0 && !body.includes('This email address has already been used to play.') && !body.includes('You can now begin your adventure with your new account.')) {
        console.log("[WARNING]: Bad captcha possibly detected.")
        /*client.report(captcha_id).catch(function (error) {
            return error
        })*/
    }
}

function setEmail(email) {
    if (typeof email === 'undefined') {
        return username_generator.generateUsername('', 12) + '@gmail.com'
    }

    return email
}

function setPassword(password) {
    if (typeof password === 'undefined') {
        return username_generator.generateUsername('', 12)
    }

    return password
}

function getRandomDay() {
    return Math.floor(Math.random() * 30) + 1
}

function getRandomMonth() {
    return Math.floor(Math.random() * 12) + 1
}

function getRandomYear() {
    return Math.floor(Math.random() * 54) + 1980
}

module.exports = router