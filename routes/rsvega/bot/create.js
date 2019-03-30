const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');


const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/create', (req, res) => {

});




module.exports = router;