const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');

const router = express.Router();

const captcha_api_key = 'fe920f0af037e534bb8180f0dbdec403';

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    postCaptchaID()
        .then(function (response) {
            return parseCaptchaID(response.data.request)
        }).catch(function (error) {
        return error
    });
});

function postCaptchaID() {
    return axios.post('http://2captcha.com/in.php', {
        json: '1',
        key: captcha_api_key,
        method: 'userrecaptcha',
        googlekey: '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv',
        pageurl: 'https://secure.runescape.com/m=account-creation/create_account?theme=oldschool',
    })
}

function parseCaptchaID(request_id) {
    setTimeout(function () {
        getCaptchaKey(request_id)
            .then(function (response) {
                return res.json(response.data.request)
            }).catch(function (error) {
            return error
        })
    }, 35000)
}

function getCaptchaKey(request_id) {
    return axios.get('http://2captcha.com/res.php', {
        params: {
            json: '1',
            id: request_id,
            key: captcha_api_key,
            action: 'get',
        }
    })
}

module.exports = router;