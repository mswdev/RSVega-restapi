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
    axios.get('https://api.sphiinx.me/rsvega/bot/id/1').then(function (response) {
        console.log(response.data.username);
        return response.data.username;
    }).catch(function (error) {
        return error;
    })
});


module.exports = router;