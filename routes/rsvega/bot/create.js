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
        axios.get('https://api.sphiinx.me/rsvega/bot/id/1')
            .then(function (response) {
                // handle success
                console.log(response.body);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
});




module.exports = router;