const express = require('express')
const body_parser = require('body-parser');

const router = express.Router()

router.use(body_parser.json());
router.use(body_parser.urlencoded({
    extended: true
}));

const pool_connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'nodejs',
    password: 'naZAus#u%+-F63Susvrt',
    database: 'rs_accounts',
    typeCast: function castField(field, useDefaultTypeCasting) {
        if (field.type === "BIT" && field.length === 1) {
            const bytes = field.buffer()
            return (bytes[0] === 1)
        }

        return (useDefaultTypeCasting())
    }
})

function getConnection() {
    return pool_connection
}

router.get('/rs/accounts/unchecked', (req, res) => {
    const select_account = "SELECT * FROM account WHERE last_update IS NULL LIMIT 1"
    getConnection().query(select_account, (error, results) => {
        if (error) throw error
        return res.json(results)
    })

    getConnection().end()
    res.end()
})

router.get('/rs/accounts/:id', (req, res) => {
    let account_id = req.params.id
    const select_account = "SELECT * FROM account WHERE id = ?"
    getConnection().query(select_account, [account_id], (error, results) => {
        if (error) throw error
        return res.json(results)
    })

    getConnection().end()
    res.end()
})

router.post('/rs/accounts/add', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    const select_account = "SELECT username FROM account WHERE username = ?"
    getConnection().query(select_account, [username], (error, results) => {
        if (error) throw error
        if (results[0] == null) {
            const insert_account = "INSERT INTO account (username, password) VALUES (?, ?)"
            getConnection().query(insert_account, [username, password], (error, results) => {
                if (error) throw error
                return res.json(results)
            })
        } else {
            return res.status(400).send({
                success: false,
                message: 'The specified username already exists.'
            })
        }
    })

    getConnection().end()
    res.end()
})

router.put('/rs/accounts/:id/update', (req, res) => {
    let account_id = req.params.id
    let username = req.body.username
    let password = req.body.password
    let display_name = req.body.display_name
    let age = req.body.age
    let is_members = req.body.is_members
    let is_bank_pin = req.body.is_bank_pin
    let is_banned = req.body.is_banned
    let is_locked = req.body.is_locked
    let is_auth = req.body.is_auth
    let is_invalid = req.body.is_invalid
    const update_account = "UPDATE account SET " +
        "username = ?, password = ?, display_name = ?," +
        "age = ?, is_members = b?, is_bank_pin = b?," +
        "is_banned = b?, is_locked = b?, is_auth = b?," +
        "is_invalid = b? WHERE id = ?"
    getConnection().query(update_account, [username,
        password, display_name, age,
        is_members, is_bank_pin, is_banned,
        is_locked, is_auth, is_invalid,
        account_id], (error, results) => {
        if (error) throw error
        return res.json(results)
    })

    getConnection().end()
    res.end()
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
    getConnection().query(update_account, [last_ingame,
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
        return res.json(results)
    })

    getConnection().end()
    res.end()
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
    getConnection().query(update_account, [last_ingame,
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
        return res.json(results)
    })

    getConnection().end()
    res.end()
})

module.exports = router

