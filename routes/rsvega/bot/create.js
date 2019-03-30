const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');

const router = express.Router();

const captcha_api_key = 'fe920f0af037e534bb8180f0dbdec403';
const create_bot_url = 'https://secure.runescape.com/m=account-creation/create_account';

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    postCaptchaID()
        .then(function (response) {
            setTimeout(function () {
                getCaptchaKey(response.data.request)
                    .then(function (response) {
                        postCreateBot(response.data.request)
                            .then(function (response) {
                                console.log("We made it here baby");
                                return res.json(response.data)
                            }).catch(function (error) {
                            return error;
                        })
                    }).catch(function (error) {
                    return error
                })
            }, 35000)
        }).catch(function (error) {
        return error
    });
});

function postCaptchaID() {
    return axios.post('http://2captcha.com/in.php', {
        'json': '1',
        'key': captcha_api_key,
        'method': 'userrecaptcha',
        'googlekey': '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv',
        'pageurl': create_bot_url,
    })
}

function getCaptchaKey(request_id) {
    return axios.get('http://2captcha.com/res.php', {
        params: {
            'json': '1',
            'id': request_id,
            'key': captcha_api_key,
            'action': 'get',
        }
    })
}

function postCreateBot(captcha_key) {
    return axios.post(create_bot_url), {
        'email1': 'rspeerdev96@gmail.com',
        'onlyOneEmail': '1',
        'password1': 'Killkid5',
        'onlyOnePassword': '1',
        'day': '27',
        'month': '07',
        'year': '1998',
        'create-submit': 'create',
        'g-recaptcha-response': captcha_key,
    }
}

module.exports = router;