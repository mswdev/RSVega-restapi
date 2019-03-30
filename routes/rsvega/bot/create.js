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
    postCreateBot()
        .then(function (response) {
            console.log("Yee");
        return response.status
    }).catch(function (error) {
      return error;
    })
    /*postCaptchaID()
        .then(function (response) {
            setTimeout(function () {
                getCaptchaKey(response.data.request)
                    .then(function (response) {
                        postCreateBot(response.data.request)
                            .then(function (response) {
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
    });*/
});

function test() {

}

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
    console.log('--------------------------------------------------------')
    console.log(captcha_key)
    return axios.post('https://secure.runescape.com/m=account-creation/create_account', {
        'theme': 'dual',
        'email1': 'rspeerdev99@gmail.com',
        'onlyOneEmail': '1',
        'password1': 'Killkid5',
        'onlyOnePassword': '1',
        'day': '27',
        'month': '07',
        'year': '1998',
        'create-submit': 'create',
        'g-recaptcha-response': '03AOLTBLQ6-q5NgtpYXzUQ5DbwXzyP7jhkvz-0Ksxi6X74FIBJH4RPo-Z-fNvwfRKPLHC17nOSzs78PUdNj-NbkeAC5V-8F7VjmxyiB1IazTN4Xacxln2sZF1bzncgASrpCqphKIcEnJKMOWcYJ6Zc5jN2onNc5ItTkcamTzUtHzwCjQaoabLd5YTOPQAHvnFEOPjSvXc8IdjVDHA4queIzJbWTR4mF7pRjJ5gZy9qIBtflNSine_5PbIcu_iQzTill20L5K1vnA18DT83lRnCOpjh8tHCIJ4XWf4EwnLhKAAh1JLmsZqn4NnAWQQvog7tN3VaTrEJKVxj-VOjjt1gVi8UJTa2b1IhJYMW_tPC3xx8UECJ40HXMLETf_6on-s3kpNZhv4_FlYq4Vqgszgy84ss8IV8RyABkw',
    })
}

module.exports = router;