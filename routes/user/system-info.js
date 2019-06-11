const express = require('express')
const body_parser = require('body-parser')
const settings = require('../db.json')
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool')
const debug = require('debug')('rsvega-restapi:system-info')

const router = express.Router()

router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}))

// Get system info by id
router.get('/rsvega/user/system-info/id/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('system_info', {id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

// Insert system info
router.post('/rsvega/user/system-info/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('system_info', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release()
            if (err) {
                debug(err)
                return res.json([err])
            }

            return res.json([rows])
        })
    })
})

// Update system info by id
router.put('/rsvega/user/system-info/id/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('system_info', req.body, {id: req.params.id}, (err, rows) => {
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
