const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
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
    return pool
}

router.get('/rs/accounts/unchecked', (req, res) => {
    const connection = getConnection()
    const select_account = "SELECT * FROM account WHERE last_update IS NULL LIMIT 1"
    connection.query(select_account, (error, results) => {
        if (error) throw error
        return res.send(({
            success: true,
            data: results,
        }))
    })
})

router.get('/rs/accounts/:id', (req, res) => {
    let account_id = req.params.id
    const connection = getConnection()
    const select_account = "SELECT * FROM account WHERE id = ?"
    connection.query(select_account, [account_id], (error, results) => {
        if (error) throw error
        return res.send(({
            success: true,
            data: results
        }))
    })
})

router.post('/rs/accounts/add', (req, res) => {
    let username = req.query.username
    let password = req.query.password
    const connection = getConnection()
    const select_account = "SELECT username FROM account WHERE username = ?"
    connection.query(select_account, [username], (error, results) => {
        if (error) throw error
        if (results[0] == null) {
            const insert_account = "INSERT INTO account (username, password) VALUES (?, ?)"
            connection.query(insert_account, [username, password], (error, results) => {
                if (error) throw error
                return res.send(({
                    success: true,
                    data: results
                }))
            })
        } else {
            return res.status(400).send({
                success: false,
                message: 'The specified username already exists.'
            })
        }
    })
})

router.put('/rs/accounts/:id/update', (req, res) => {
    let account_id = req.params.id
    let username = req.query.username
    let password = req.query.password
    let display_name = req.query.display_name
    let age = req.query.age
    let is_members = req.query.is_members
    let is_bank_pin = req.query.is_bank_pin
    let is_banned = req.query.is_banned
    let is_locked = req.query.is_locked
    let is_auth = req.query.is_auth
    let is_invalid = req.query.is_invalid
    const connection = getConnection()
    const update_account = "UPDATE account SET " +
        "username = ?, password = ?, display_name = ?," +
        "age = ?, is_members = b?, is_bank_pin = b?," +
        "is_banned = b?, is_locked = b?, is_auth = b?," +
        "is_invalid = b? WHERE id = ?"
    connection.query(update_account, [username,
        password, display_name, age,
        is_members, is_bank_pin, is_banned,
        is_locked, is_auth, is_invalid,
        account_id], (error, results) => {
        if (error) throw error
        return res.send(({
            success: true,
            data: results
        }))
    })
})

router.put('/rs/accounts/:id/osrs/update', (req, res) => {
    let account_id = req.params.id
    let last_ingame = req.query.last_ingame
    let bank_worth = req.query.bank_worth
    let inventory_worth = req.query.inventory_worth
    let equipment_worth = req.query.equipment_worth
    let position_x = req.query.position_x
    let position_y = req.query.position_y
    let position_z = req.query.position_z
    let level_total = req.query.level_total
    let level_combat = req.query.level_combat
    let level_attack = req.query.level_attack
    let level_defence = req.query.level_defence
    let level_strength = req.query.level_strength
    let level_hitpoints = req.query.level_hitpoints
    let level_ranged = req.query.level_ranged
    let level_prayer = req.query.level_prayer
    let level_magic = req.query.level_magic
    let level_cooking = req.query.level_cooking
    let level_woodcutting = req.query.level_woodcutting
    let level_fletching = req.query.level_fletching
    let level_fishing = req.query.level_fishing
    let level_firemaking = req.query.level_firemaking
    let level_crafting = req.query.level_crafting
    let level_smithing = req.query.level_smithing
    let level_mining = req.query.level_mining
    let level_herblore = req.query.level_herblore
    let level_agility = req.query.level_agility
    let level_thieving = req.query.level_thieving
    let level_slayer = req.query.level_slayer
    let level_farming = req.query.level_farming
    let level_runecrafting = req.query.level_runecrafting
    let level_hunter = req.query.level_hunter
    let level_construction = req.query.level_construction
    let quest_points = req.query.quest_points
    let quests_complete = req.query.quests_complete
    const connection = getConnection()
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
        return res.send(({
            success: true,
            data: results
        }))
    })
})

router.put('/rs/accounts/:id/rs3/update', (req, res) => {
    let account_id = req.params.id
    let last_ingame = req.query.last_ingame
    let bank_worth = req.query.bank_worth
    let inventory_worth = req.query.inventory_worth
    let equipment_worth = req.query.equipment_worth
    let position_x = req.query.position_x
    let position_y = req.query.position_y
    let position_z = req.query.position_z
    let level_total = req.query.level_total
    let level_combat = req.query.level_combat
    let level_attack = req.query.level_attack
    let level_defence = req.query.level_defence
    let level_strength = req.query.level_strength
    let level_hitpoints = req.query.level_hitpoints
    let level_ranged = req.query.level_ranged
    let level_prayer = req.query.level_prayer
    let level_magic = req.query.level_magic
    let level_cooking = req.query.level_cooking
    let level_woodcutting = req.query.level_woodcutting
    let level_fletching = req.query.level_fletching
    let level_fishing = req.query.level_fishing
    let level_firemaking = req.query.level_firemaking
    let level_crafting = req.query.level_crafting
    let level_smithing = req.query.level_smithing
    let level_mining = req.query.level_mining
    let level_herblore = req.query.level_herblore
    let level_agility = req.query.level_agility
    let level_thieving = req.query.level_thieving
    let level_slayer = req.query.level_slayer
    let level_farming = req.query.level_farming
    let level_runecrafting = req.query.level_runecrafting
    let level_hunter = req.query.level_hunter
    let level_construction = req.query.level_construction
    let level_summoning = req.query.level_summoning
    let level_dungeoneering = req.query.level_dungeoneering
    let level_divination = req.query.level_divination
    let level_invention = req.query.level_invention
    let quest_points = req.query.quest_points
    let quests_complete = req.query.quests_complete
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
    const connection = getConnection()
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
        return res.send(({
            success: true,
            data: results
        }))
    })
})

module.exports = router
