const express = require('express');
const account = require('runescape-account-creator');
const body_parser = require('body-parser');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.post('/rsvega/account/create', (req, res) => {
    account.create(req.body.two_captcha_api_key, req.body.email, req.body.password, req.body.socks_ip, req.body.socks_port, req.body.socks_username, req.body.socks_password).then(response => {
        return res.send(response);
    })
});

module.exports = router;