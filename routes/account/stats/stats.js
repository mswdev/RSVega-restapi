const express = require('express')
const body_parser = require('body-parser')
const settings = require('../../db.json')
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool')
const debug = require('debug')('rsvega-restapi:stats')

const router = express.Router()

router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}))

// Get stats osrs by account id
router.get('/rsvega/account/id/:id/stats/osrs', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('stats_osrs', {account_id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json(rows)
        })
    })
})

// Get stats rs3 by account id
router.get('/rsvega/account/id/:id/stats/rs3', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('stats_rs3', {account_id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json(rows)
        })
    })
})

// Update stats osrs by account id
router.put('/rsvega/account/id/:id/stats/osrs/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_osrs', req.body, {account_id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

// Update stats rs3 by account id
router.put('/rsvega/account/id/:id/stats/rs3/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_rs3', req.body, {account_id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

module.exports = router
