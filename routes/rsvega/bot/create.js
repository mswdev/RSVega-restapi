const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');


const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {
    axios.get('https://api.sphiinx.me/rsvega/bot/1/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});




module.exports = router;