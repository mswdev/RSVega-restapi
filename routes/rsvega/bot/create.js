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
    console.log(SolveRecaptchaV2(captcha_api_key, '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv', create_bot_url))
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

function SolveRecaptchaV2(APIKey, googleKey, pageUrl, proxy, proxyType){
    var requestUrl = "http://2captcha.com/in.php?key=" + APIKey + "&method=userrecaptcha&googlekey=" + googleKey + "&pageurl=" + pageUrl;

    switch (proxyType) {
        case 'HTTP':
            requestUrl = requestUrl + "HTTP";
            break;

        case 'HTTPS':
            requestUrl = requestUrl + "HTTPS";
            break;

        case 'SOCKS4':
            requestUrl = requestUrl + "SOCKS4";
            break;

        case 'SOCKS5':
            requestUrl = requestUrl + "SOCKS5";
            break;
    }

    $.ajax({url: "requestUrl", success: async function (result) {
            if (result.length < 3) {
                return false;
            } else {
                if (result.substring(0, 3) === "OK|") {
                    var captchaID = result.substring(3);

                    for (var i = 0; i < 24; i++) {
                        var ansUrl = "http://2captcha.com/res.php?key=" + APIKey + "&action=get&id=" + captchaID;

                        $.ajax({
                            url: ansUrl, success: function (ansresult) {
                                if (ansresult.length < 3) {
                                    return ansresult;
                                } else {
                                    if (ansresult.substring(0, 3) === "OK|") {
                                        return ansresult;
                                    } else if (ansresult !== "CAPCHA_NOT_READY") {
                                        return ansresult;
                                    }
                                }
                            }
                        });
                        await sleep(5000);
                    }

                } else {
                    return ansresult;
                }
            }
        },
        fail: function(){
            return "";
        }
    });

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
    return axios.post(create_bot_url, {
        'theme': 'dual',
        'email1': 'rspeerdev98@gmail.com',
        'onlyOneEmail': '1',
        'password1': 'Killkid5',
        'onlyOnePassword': '1',
        'day': '27',
        'month': '07',
        'year': '1998',
        'create-submit': 'create',
        'g-recaptcha-response': captcha_key,
    })
}

module.exports = router;