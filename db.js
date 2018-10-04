const mysql = require('mysql')
const sqlConnection = function sqlConnection(sql, values, next) {
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    let pool_connection = mysql.createPool({
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

    pool_connection.getConnection((error) => {
        if (error) throw error
    });

    pool_connection.query(sql, values, (error, results) => {
        if (error) throw error
        pool_connection.end();
        next.apply(this, arguments);
    });
}

module.exports = sqlConnection;