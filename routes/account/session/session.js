const express = require('express')
const body_parser = require('body-parser')
const settings = require('../../db.json')
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool')
const debug = require('debug')('rsvega-restapi:session')

const router = express.Router()

router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}))

// Get session by id
router.get('/rsvega/account/session/id/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('session', {id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

// Insert session
router.post('/rsvega/account/session/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('session', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

// Update session by id
router.put('/rsvega/account/session/id/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('session', req.body, {id: req.params.id}, (err, rows) => {
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
