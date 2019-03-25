const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());

const rs_bot_router = require('./routes/rsvega/bot.js');
app.use(rs_bot_router);

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
});
