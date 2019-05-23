const express = require('express');
const body_parser = require('body-parser');
const settings = require('../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/id/:id/stats/osrs', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('bot', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.get('/rsvega/bot/id/:id/stats/rs3', (req, res) => {
    pool.get_connection(qb => {
        qb.get_where('bot', {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rsvega/bot/id/:id/stats/osrs/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_osrs', req.body, {'bot_id': req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rsvega/bot/id/:id/stats/rs3/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('stats_rs3', req.body, {'bot_id': req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;