const express = require('express')
const account = require('runescape-account-creator')
const body_parser = require('body-parser')
const debug = require('debug')('rsvega-restapi:create')

const router = express.Router()

router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}))

// Post account create
router.post('/rsvega/account/create', async (req, res) => {
    const builder = account.buildAccountCreator(req.body.two_captcha_api_key)
    try {
        const response = await builder.register({
            email: req.body.email,
            password: req.body.password,
            proxy: formatProxyUrl(req.body.socks_ip, req.body.socks_port, req.body.socks_username, req.body.socks_password)
        })

        res.send([response])
    } catch (e) {
        debug({error: e.message})
        res.send([{error: e.message}])
    }
})

function formatProxyUrl(ip, port, username, password) {
    if (!ip || !port) {
        return null
    }

    if (!username && !password) {
        return `socks5://${ip}:${port}`
    }

    return `socks5://${username}:${password}@${ip}:${port}`
}

module.exports = router
