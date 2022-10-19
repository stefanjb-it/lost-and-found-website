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
        const sql = "INSERT INTO items (found_by,location_bf,location_now,picture,category) VALUES ('" +
            found_by + "','" + loc_bf + "','" + loc_now + "','" + filename + "','" + cat + "')";

        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    },
    get_list(callback) {
        if (con == null) {
            connect();
        }
        const sql = "SELECT * FROM items WHERE collected=0;";
        con.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });
    },
    get_list_by_cat(cat, callback) {
        if (con == null) {
            connect();
        }
        const sql = "SELECT * FROM items WHERE collected=0 AND category='" + cat + "';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });
    },
    get_item(id, callback) {
        if (con == null) {
            connect();
        }
        const sql = "SELECT * FROM items WHERE collected=0 AND id=" + id;
        con.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });
    },
    remove_item(re) {
        if (con == null) {
            connect();
        }
        const sql = "UPDATE items SET collected=1 WHERE id=" + re;
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }
}