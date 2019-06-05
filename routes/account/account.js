const express = require('express');
const body_parser = require('body-parser');
const settings = require('../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.use(express.static('./public'));

// Get account by id
router.get('/rsvega/account/id/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('account', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

// Insert account
router.post('/rsvega/account/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('account', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

// Update account by id
router.put('/rsvega/account/id/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('account', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json([rows])
        })
    })
});

// Get account where is mule order by random limit 1
router.get('/rsvega/account/is-mule/active/random', (req, res) => {
    pool.get_connection(qb => {
        qb.query('SELECT * FROM `account` WHERE `is_mule` = 1 AND `last_update` >= NOW() - INTERVAL 1 MINUTE ORDER BY RAND() LIMIT 1', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

// Get unchecked account
router.get('/rsvega/account/unchecked', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "random").get_where('account', {'last_check': null}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;
