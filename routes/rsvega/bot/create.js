const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    axios.get('http://2captcha.com/res.php', {
        json: '1',
        id: '61352621840',
        key: 'fe920f0af037e534bb8180f0dbdec403',
        action: get,
    }).then(function (response) {
        console.log(response.data.request);
        return response.data.request;
    }).catch(function (error) {
        return error;
    })
});

module.exports = router;