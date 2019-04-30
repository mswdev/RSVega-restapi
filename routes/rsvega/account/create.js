const express = require('express');
const account = require('runescape-account-creator');
const body_parser = require('body-parser');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.post('/rsvega/account/create', (req, res) => {
    console.log(req.body.two_captcha_api_key == null)
    console.log(req.body.two_captcha_api_key)
    console.log(req.body.email == null)
    console.log(req.body.email)
    console.log(req.body.password == null)
    console.log(req.body.password)
    console.log(req.body.socks_ip == null)
    console.log(req.body.socks_ip)
    console.log(req.body.socks_port == null)
    console.log(req.body.socks_port)
    console.log(req.body.socks_username == null)
    console.log(req.body.socks_username)
    console.log(req.body.socks_password == null)
    console.log(req.body.socks_password)
    account.create(req.body.two_captcha_api_key, req.body.email, req.body.password, req.body.socks_ip, req.body.socks_port, req.body.socks_username, req.body.socks_password).then(response => {
        return res.send(response);
    })
});

module.exports = router;