const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());

const user_router = require('./routes/user/user.js');
const system_info_router = require('./routes/user/system-info.js');
const account_router = require('./routes/account/account.js');
const create_account_router = require('./routes/account/create.js');
const stats_router = require('./routes/account/stats/stats.js');
const session_router = require('./routes/account/session/session.js');
const session_position_router = require('./routes/account/session/session_position.js');
const mule_order_router = require('./routes/account/session/mule-order.js');
app.use(user_router, system_info_router, account_router, create_account_router, stats_router, session_router, session_position_router, mule_order_router);

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
});
