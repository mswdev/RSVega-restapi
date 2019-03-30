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
    setTimeout(getCaptchaKey(), 35000);
    /*if (getCaptchaKeyTimeout().status === 0)
        getCaptchaKeyTimeout();
    else
        console.log("SUCCESS")*/
});

function postCaptchaKey() {
    axios.post('http://2captcha.com/in.php', {
        json: '1',
        key: captcha_api_key,
        method: 'userrecaptcha',
        googlekey: '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv',
        pageurl: 'https://secure.runescape.com/m=account-creation/create_account?theme=oldschool',
    }).then(function (response) {
        console.log(response.data.request)
        return response.data.request;
    }).catch(function (error) {
        return error;
    })
}

function getCaptchaKey(request_id) {
    axios.get('http://2captcha.com/res.php', {
        params: {
            json: '1',
            id: request_id,
            key: captcha_api_key,
            action: 'get',
        }
    }).then(function (response) {
        console.log(response.data.request);
        return response.data;
    }).catch(function (error) {
        return error;
    })
}

module.exports = router;