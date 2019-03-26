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

router.get('/rsvega/bot/unchecked', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "random").get_where('bot', {'last_check': null}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.get('/rsvega/bot/:id', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('bot', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});



router.put('/rsvega/bot/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('bot', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;
