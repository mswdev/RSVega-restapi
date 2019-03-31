const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());

const rs_bot_router = require('./routes/rsvega/bot/bot.js');
const rs_create_account_router = require('./routes/rsvega/bot/create.js');
const rs_stats_router = require('./routes/rsvega/bot/stats.js');
const rs_session_router = require('./routes/rsvega/bot/session/session.js');
const rs_mule_order_router = require('./routes/rsvega/bot/session/mule-order.js');
const rs_account_router = require('./routes/rsvega/account.js');
app.use(rs_bot_router, rs_create_account_router, rs_stats_router, rs_session_router, rs_mule_order_router, rs_account_router);

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
});
