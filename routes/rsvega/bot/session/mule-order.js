const express = require('express');
const body_parser = require('body-parser');
const settings = require('../../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

router.get('/rsvega/bot/session/bot-id/:bot_id/mule-order/newest', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "DESC").get_where('mule_order', {bot_id: req.params.bot_id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.get('/rsvega/bot/session/account-id/:account_id/mule-order/unassigned', (req, res) => {
    pool.get_connection(qb => {
        qb.limit(1).order_by("id", "DESC").get_where('mule_order', {account_id: req.params.account_id, mule_bot_id: 0}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.post('/rsvega/bot/session/mule-order/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert_ignore('mule_order', req.body, 'ON DUPLICATE KEY UPDATE id=id', (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

router.put('/rsvega/bot/session/id/:id/mule-order/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('mule_order', req.body, {id: req.params.id}, (err, rows) => {
            qb.release();
            if (err) throw err;
            return res.json(rows)
        })
    })
});

module.exports = router;