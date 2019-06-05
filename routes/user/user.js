const express = require('express');
const body_parser = require('body-parser');
const settings = require('../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

// Get user by id
router.get('/rsvega/user/id/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('user', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

// Insert user
router.post('/rsvega/user/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('user', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

// Update user by id
router.put('/rsvega/user/id/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('user', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

module.exports = router;
