const express = require('express');
const body_parser = require('body-parser');
const settings = require('../../db.json');
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

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