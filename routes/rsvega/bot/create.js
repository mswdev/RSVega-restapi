const express = require('express');
const body_parser = require('body-parser');
const request = require('request');
const axios = require('axios');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    request.get('https://api.sphiinx.me/rsvega/bot/id/1').on('response', function(response) {
        console.log(response.get('username')) // 200
    })
});




module.exports = router;