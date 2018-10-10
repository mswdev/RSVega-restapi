const express = require('express')
const body_parser = require('body-parser')
const settings = require('./db.json')
const pool = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool')

const router = express.Router()

router.use(body_parser.json())
router.use(body_parser.urlencoded({
    extended: true
}))

router.use(express.static('./public'))

router.get('/rs/accounts/unchecked', (req, res) => {
    const select_account = "SELECT * FROM account WHERE last_update IS NULL LIMIT 1"

    pool.get_connection((error, connection) => {
        if (error) throw error
        connection.query(select_account, (error, results) => {
            if (error) throw error
            return res.json(results).end()
        })

        connection.release()
    })
})

router.get('/rs/accounts/:id', (req, res) => {
    let account_id = req.params.id
    const select_account = "SELECT * FROM account WHERE id = ?"

    pool.get_connection((error, connection) => {
        if (error) throw error
        connection.query(select_account, [account_id], (error, results) => {
            if (error) throw error
            return res.json(results).end()
        })

        connection.release()
    })
})

router.post('/rs/accounts/add', (req, res) => {
    pool.get_connection(qb => {
        qb.insert('account', req.body, true, (err, rows) => {
            qb.release()
            if (err) throw err
            return res.json(rows)
        })
    })
})

router.put('/rs/accounts/:id/update', (req, res) => {
    pool.get_connection(qb => {
        qb.update('account', req.body, {id: req.params.id}, (err, rows) => {
            qb.release()
            if (err) throw err
            return res.json(rows)
        })
    })
})

router.put('/rs/accounts/:id/osrs/update', (req, res) => {
    let account_id = req.params.id
    let last_ingame = req.body.last_ingame
    let bank_worth = req.body.bank_worth
    let inventory_worth = req.body.inventory_worth
    let equipment_worth = req.body.equipment_worth
    let position_x = req.body.position_x
    let position_y = req.body.position_y
    let position_z = req.body.position_z
    let level_total = req.body.level_total
    let level_combat = req.body.level_combat
    let level_attack = req.body.level_attack
    let level_defence = req.body.level_defence
    let level_strength = req.body.level_strength
    let level_hitpoints = req.body.level_hitpoints
    let level_ranged = req.body.level_ranged
    let level_prayer = req.body.level_prayer
    let level_magic = req.body.level_magic
    let level_cooking = req.body.level_cooking
    let level_woodcutting = req.body.level_woodcutting
    let level_fletching = req.body.level_fletching
    let level_fishing = req.body.level_fishing
    let level_firemaking = req.body.level_firemaking
    let level_crafting = req.body.level_crafting
    let level_smithing = req.body.level_smithing
    let level_mining = req.body.level_mining
    let level_herblore = req.body.level_herblore
    let level_agility = req.body.level_agility
    let level_thieving = req.body.level_thieving
    let level_slayer = req.body.level_slayer
    let level_farming = req.body.level_farming
    let level_runecrafting = req.body.level_runecrafting
    let level_hunter = req.body.level_hunter
    let level_construction = req.body.level_construction
    let quest_points = req.body.quest_points
    let quests_complete = req.body.quests_complete
    const update_account = "UPDATE stats_osrs SET " +
        "last_ingame = ?, bank_worth = ?, inventory_worth = ?," +
        "equipment_worth = ?, position_x = ?, position_y = ?," +
        "position_z = ?, level_total = ?, level_combat = ?," +
        "level_attack = ?, level_defence = ?, level_strength = ?," +
        "level_hitpoints = ?, level_ranged = ?, level_prayer = ?," +
        "level_magic = ?, level_cooking = ?, level_woodcutting = ?," +
        "level_fletching = ?, level_fishing = ?, level_firemaking = ?," +
        "level_crafting = ?, level_smithing = ?, level_mining = ?," +
        "level_herblore = ?, level_agility = ?, level_thieving = ?," +
        "level_slayer = ?, level_farming = ?, level_runecrafting = ?," +
        "level_hunter = ?, level_construction = ?, quest_points = ?," +
        "quests_complete = ? WHERE account_id = ?"

    pool.get_connection((error, connection) => {
        if (error) throw error
        connection.query(update_account, [last_ingame,
            bank_worth, inventory_worth, equipment_worth,
            position_x, position_y, position_z,
            level_total, level_combat, level_attack,
            level_defence, level_strength, level_hitpoints,
            level_ranged, level_prayer, level_magic,
            level_cooking, level_woodcutting, level_fletching,
            level_fishing, level_firemaking, level_crafting,
            level_smithing, level_mining, level_herblore,
            level_agility, level_thieving, level_slayer,
            level_farming, level_runecrafting, level_hunter,
            level_construction, quest_points, quests_complete,
            account_id], (error, results) => {
            if (error) throw error
            return res.json(results).end()
        })

        connection.release()
    })
})

router.put('/rs/accounts/:id/rs3/update', (req, res) => {
    let account_id = req.params.id
    let last_ingame = req.body.last_ingame
    let bank_worth = req.body.bank_worth
    let inventory_worth = req.body.inventory_worth
    let equipment_worth = req.body.equipment_worth
    let position_x = req.body.position_x
    let position_y = req.body.position_y
    let position_z = req.body.position_z
    let level_total = req.body.level_total
    let level_combat = req.body.level_combat
    let level_attack = req.body.level_attack
    let level_defence = req.body.level_defence
    let level_strength = req.body.level_strength
    let level_hitpoints = req.body.level_hitpoints
    let level_ranged = req.body.level_ranged
    let level_prayer = req.body.level_prayer
    let level_magic = req.body.level_magic
    let level_cooking = req.body.level_cooking
    let level_woodcutting = req.body.level_woodcutting
    let level_fletching = req.body.level_fletching
    let level_fishing = req.body.level_fishing
    let level_firemaking = req.body.level_firemaking
    let level_crafting = req.body.level_crafting
    let level_smithing = req.body.level_smithing
    let level_mining = req.body.level_mining
    let level_herblore = req.body.level_herblore
    let level_agility = req.body.level_agility
    let level_thieving = req.body.level_thieving
    let level_slayer = req.body.level_slayer
    let level_farming = req.body.level_farming
    let level_runecrafting = req.body.level_runecrafting
    let level_hunter = req.body.level_hunter
    let level_construction = req.body.level_construction
    let level_summoning = req.body.level_summoning
    let level_dungeoneering = req.body.level_dungeoneering
    let level_divination = req.body.level_divination
    let level_invention = req.body.level_invention
    let quest_points = req.body.quest_points
    let quests_complete = req.body.quests_complete
    const update_account = "UPDATE stats_rs3 SET " +
        "last_ingame = ?, bank_worth = ?, inventory_worth = ?," +
        "equipment_worth = ?, position_x = ?, position_y = ?," +
        "position_z = ?, level_total = ?, level_combat = ?," +
        "level_attack = ?, level_defence = ?, level_strength = ?," +
        "level_hitpoints = ?, level_ranged = ?, level_prayer = ?," +
        "level_magic = ?, level_cooking = ?, level_woodcutting = ?," +
        "level_fletching = ?, level_fishing = ?, level_firemaking = ?," +
        "level_crafting = ?, level_smithing = ?, level_mining = ?," +
        "level_herblore = ?, level_agility = ?, level_thieving = ?," +
        "level_slayer = ?, level_farming = ?, level_runecrafting = ?," +
        "level_hunter = ?, level_construction = ?, level_summoning = ?," +
        "level_dungeoneering = ?, level_divination = ?, level_invention = ?," +
        "quest_points = ?, quests_complete = ? WHERE account_id = ?"

    pool.get_connection((error, connection) => {
        if (error) throw error
        connection.query(update_account, [last_ingame,
            bank_worth, inventory_worth, equipment_worth,
            position_x, position_y, position_z,
            level_total, level_combat, level_attack,
            level_defence, level_strength, level_hitpoints,
            level_ranged, level_prayer, level_magic,
            level_cooking, level_woodcutting, level_fletching,
            level_fishing, level_firemaking, level_crafting,
            level_smithing, level_mining, level_herblore,
            level_agility, level_thieving, level_slayer,
            level_farming, level_runecrafting, level_hunter,
            level_construction, level_summoning, level_dungeoneering,
            level_divination, level_invention, quest_points,
            quests_complete, account_id], (error, results) => {
            if (error) throw error
            return res.json(results).end()
        })

        connection.release()
    })
})

module.exports = router
