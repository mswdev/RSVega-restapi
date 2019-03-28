const express = require('express');
const body_parser = require('body-parser');
const settings = require('../../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/session/bot-id/:bot_id/newest', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "DESC").get_where('session', {id: req.params.bot_id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.post('/rsvega/bot/session/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('session', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rsvega/bot/id/:id/session/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('session', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;