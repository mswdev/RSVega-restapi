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
        { email1: 'rspeerdev120@gmail.com',
            onlyOneEmail: '1',
            password1: 'Killkid5',
            onlyOnePassword: '1',
            day: '27',
            month: '07',
            year: '1998',
            'create-submit': 'create',
            'g-recaptcha-response': '03AOLTBLSztzLJHGaz0E4vuZQz1xaKG9OC3Jo82ktTl_8bjGYXvcS23Tz3qelVnwiT57HzrnFhOG26cxHKp4xuCYdj5XA3QrYzydXa-5__HeQfbS8KxdtyIbkbLYMBv-TMcFWRGVgz9d1nb7ydn5QZBsxyMG0Ca9jaIkStj7fbdOtK2M--TJKuOnPeWpVAYmNP8Vy47hLUzzeia6m2X9Bpxw0l2VZVmx6x2edj-5TZKvm2ckwUDm2fM6qwZoVeGzzyWtQTAzkrXfugyiQ-tCrWwXrMqOMrTs4tzODAFKKHGds7lvhxfllxaWr97mcWNHarvLVSZJAVG6q15jKUzyDiYeponLAzbo54bL2ZtnS768qaEsX1HiwDIg28YqSamWtIYFG5SlmaOmW0',
            undefined: undefined } };


module.exports = router;