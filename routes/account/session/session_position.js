const express = require('express');
const body_parser = require('body-parser');
const settings = require('../../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

// Get session position by id
router.get('/rsvega/account/session/session-position/id/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('session_position', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

// Insert session position
router.post('/rsvega/account/session/session-position/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('session_position', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

// Update session position by id
router.put('/rsvega/account/session/id/session-position/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('session_position', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

module.exports = router;
