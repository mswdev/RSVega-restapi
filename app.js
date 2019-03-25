const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.options('*', cors());

const rs_accounts_router = require('./routes/rs/account.js');
app.use(rs_accounts_router);

app.listen(8080, () => {
    console.log("NodeJS API running on port 8080.")
});
