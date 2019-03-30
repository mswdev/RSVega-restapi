const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    axios.post('http://2captcha.com/in.php', {
        json: '1',
        key: 'fe920f0af037e534bb8180f0dbdec403',
        method: 'userrecaptcha',
        googlekey: '6Lcsv3oUAAAAAGFhlKrkRb029OHio098bbeyi_Hv',
        pageurl: 'https://secure.runescape.com/m=account-creation/create_account?theme=oldschool',
    }).then(function (response) {
        console.log(response.data)
    }).catch(function (error) {
        console.log(error);
    })
});


module.exports = router;