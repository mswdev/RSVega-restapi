const express = require('express')
const app = express()

const router = require('./routes/rs/accounts.js')
app.use(router)

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
})

