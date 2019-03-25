const express = require('express');
const body_parser = require('body-parser');
const settings = require('./db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.use(express.static('./public'));

router.get('/rs/accounts/unchecked', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "random").get_where('account', {'last_check': null}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.get('/rs/accounts/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('account', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.post('/rs/accounts/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('account', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rs/accounts/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('account', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rs/accounts/:id/osrs/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_osrs', req.body, {'account_id': req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rs/accounts/:id/rs3/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_rs3', req.body, {'account_id': req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;
