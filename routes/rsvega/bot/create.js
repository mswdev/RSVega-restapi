const express = require('express');
const body_parser = require('body-parser');
const request = require('request');
const socks_agent = require('socks5-https-client/lib/Agent');
const two_captcha_client = require('@infosimples/node_two_captcha');
const faker = require('faker');

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
    var proxy_url = setProxy(req.body.socks_ip, req.body.socks_port, req.body.socks_username, req.body.proxy_password);
    console.log(proxy_url);

    getRecaptchaKey(proxy_url).then(function (response) {
        console.log(response.text);
        request({
            method: 'POST',
            url: create_bot_url,
            agentClass: socks_agent,
            agentOptions: {
                socksHost: '',
                socksPort: '',
                socksUsername: '',
                socksPassword: '',
            },
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
            },
        }, function (error, response, body) {
            if (error) throw error;
            reportBadCaptcha(body, response.text);
            console.log('-------------------------------------------------------------------------');
            console.log(response.text);
            console.log('-------------------------------------------------------------------------');
            return res.json(
                {
                    success: body.length === 0,
                    email: email,
                    password: password,
                    proxy: proxy_url,
                })
        })
    })
});

function getRecaptchaKey(proxy_url) {
    return client.decodeRecaptchaV2({
        googlekey: google_key,
        pageurl: create_bot_url,
        proxy: proxy_url,
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
        return faker.internet.email()
    }

    return email
}

function setPassword(password) {
    if (typeof password === 'undefined') {
        return faker.internet.password()
    }

    return password
}

function setProxy(ip, port, proxy_username, proxy_password) {
    if (typeof ip === 'undefined' || typeof port === 'undefined') {
        return ''
    }

    if (typeof proxy_username === 'undefined' || typeof proxy_password === 'undefined') {
        return ip + ':' + port
    }

    return proxy_username + ':' + proxy_password + '@' + ip + ':' + port
}

function getRandomDay() {
    return Math.floor(Math.random() * 28) + 1
}

function getRandomMonth() {
    return Math.floor(Math.random() * 12) + 1
}

function getRandomYear() {
    return Math.floor(Math.random() * 24) + 1980
}

module.exports = router;