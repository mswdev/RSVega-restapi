const express = require('express');
const body_parser = require('body-parser');
const settings = require('./db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/account/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('account', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.post('/rsvega/account/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('account', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rsvega/account/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('account', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;