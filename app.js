const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());

const rs_bot_router = require('./routes/rsvega/bot/bot.js');
app.use(rs_bot_router);

const rs_stats_router = require('./routes/rsvega/bot/stats.js');
app.use(rs_stats_router);

const rs_session_router = require('./routes/rsvega/bot/session.js');
app.use(rs_session_router);

const rs_mule_order_router = require('./routes/rsvega/bot/mule-order.js');
app.use(rs_mule_order_router);

const rs_account_router = require('./routes/rsvega/account.js');
app.use(rs_account_router);

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
});
