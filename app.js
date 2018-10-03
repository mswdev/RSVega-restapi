const express = require('express')
const app = express()

const rs_accounts_router = require('./routes/rs/accounts.js')
app.use(rs_accounts_router)

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
})

