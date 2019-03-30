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

const requestBody = {
    'theme': 'dual',
    'email1': 'rspeerdev100@gmail.com',
    'onlyOneEmail': '1',
    'password1': 'Killkid5',
    'onlyOnePassword': '1',
    'day': '27',
    'month': '07',
    'year': '1998',
    'create-submit': 'create',
    'g-recaptcha-response': '03AOLTBLT1rmnE1Qm5IknE0OjYhuUm6AhdiRwk4kMUKyDp_9xdQG_qWTBvyR-quLegUPU5948ddK76-MNwexlEtGjI7VQNIgRg0LLls52bnTKRmLXbgHXNzvyK00b0homKF7gcdWDwz_BMjJ3To3lJpGTfT-paq5VR7pmMEAvn5r_aWYeuJvGjehV_xmWi1jo6KXcPXyxSMJoufc0FPOMcujSMK1953dmB0rkrUd-N0oEBMcqzc1WCh8liJcGdEO-sQLCHULznMU-HOGLOA0eQzRQAS75aBfMxwGpg1dzIFFfMc30v2CHlkva8NKlOmvNbUlPC8Xb71uG-',
};

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

function postCreateBot(captcha_key) {
    console.log('--------------------------------------------------------')
    console.log(captcha_key)
    return axios.post('https://secure.runescape.com/m=account-creation/create_account', requestBody, config);
}

module.exports = router;