const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');
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
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
    /*getRecaptchaKey().then(function (response) {
        postCreateBot(response.text).then(function (response) {
            console.log("We made it");
            console.log(req.body.username);
            console.log(req.body.password);
            return res.json(response, req.body.username, req.body.password)
        }).catch(function (error) {
            return res.json(error)
        })
    });*/
});

function getRecaptchaKey() {
    return client.decodeRecaptchaV2({
        googlekey: google_key,
        pageurl: create_bot_url
    });
}

var request = require("request");

var options = { method: 'POST',
    url: 'https://secure.runescape.com/m=account-creation/create_account',
    headers:
        { 'Postman-Token': 'a7a639f8-603e-4b4f-970b-12f8c011c28f',
            'cache-control': 'no-cache' },
    form:
        { email1: 'rspeerdev101@gmail.com',
            onlyOneEmail: '1',
            password1: 'Killkid5',
            onlyOnePassword: '1',
            day: '27',
            month: '07',
            year: '1998',
            'create-submit': 'create',
            'g-recaptcha-response': '03AOLTBLRLkJ_YB4BmBHXgb5zf6YNSIHkG-sh7JQLqrgX8now9QvFWTM82wbibRv0GuXDB49kG1uaoBQBtdtdLtYud6VAJGOruAISIr6oIWCdIRnMHKjoCrsJmOMIsJBD_VdbVJMyDuk_Prbu5zzO3jUkr6GJPB8n4eM55IsIMNE9BskEerIgN0u_dFp7GNuNdUTi0WS037yZqIYP4KnCPJUPkg5-Ts6hDGL82CzjD_-qqKq6JcZezujqGz1SDhffimK0-S4yto-7ieIUY4vewSdDptGc3vsFu9-zoACH4AoMf3pAnzEgnjpiThjfwp5VtpGJqQJHn1fpM5v5Hh_Tp5AUD7-p_B4ksWUPWm0_oW_Cmp7T-ppp-WwJnyE2Zu6zc6VBcZ18WxQbT',
            undefined: undefined } };


module.exports = router;