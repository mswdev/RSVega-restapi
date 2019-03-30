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
        'g-recaptcha-response': '03AOLTBLQk0wgPDmQnGMM8TxOvUIilPxYIVfvrt1k-n6O92T5XHg4iq1d0wZyl-VeSmBWkUoi6sGwPWlDwmQbo2fK5tYai1iEg5KkGmO45uwgefwWb6GnhIbeRg07ywezUNRWAWndtL0ezyG4SdW2NavZLtb4Qkq1-YLc3w9t4Qkt_YssXJlpv_nBtLw_NiEWy7Nl4VC2Kps9z6D2run3qCIskz5jU7DaKLmwb4mcy7KPF_KuOW9LHG_qsx9lwuu6v1v3KkG7LfnLhoG9CMDW-R1j8HIEhoqxwsn-IzwSoftQzm2PUzg6CRE1nuYOfBvlwwBOSr3HjGTXxg7huchyRgoSWZtdT604sOP2ZqBSdB_IxxeQyESlb225-CJz7JO2ng-im4WaLOqUA4cEtL6Scs-I5Ubg3kr0Nxw',
    })
}

module.exports = router;