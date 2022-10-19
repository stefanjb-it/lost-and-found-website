const mysql = require("mysql");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
let con;

function connect() {
    con = mysql.createConnection({
        host: config.DB_hostname,
        user: config.DB_username,
        password: config.DB_password,
        database: config.DB_schema
    });
}

module.exports = {
    add_item(found_by, loc_bf, loc_now, filename, cat) {
        if (con == null) {
            connect();
        }

        const sql = "INSERT INTO items (found_by,location_bf,location_now,picture,category) VALUES ('" + found_by + "','" + loc_bf + "','" + loc_now + "','" + filename + "','" + cat + "')";

        con.query(sql, function(err, result) {
            if (err) throw err;
        });
    },
    get_list(callback) {
        if (con == null) {
            connect();
        }

        const sql = "SELECT * FROM items";
        con.query(sql, function(err, result) {
            if (err) throw err;
            return callback(result);
        });
    }
}