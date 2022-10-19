const ldap = require('ldapjs');
var CryptoJS = require("crypto-js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

var client;
let dn;

function authDN(dn, password, cb) {
    client = ldap.createClient({
        url: config.LDAP_IP,
        reconnect: true
    });

    client.bind(dn, password, function (err) {
        cb(err === null, err);
    });
}

function auth(req, response, next) {
    var cookie = req.cookies['auth_cookie'];

    if (cookie != undefined) {
        next();
    } else {
        let name = req.param('name');
        let password = req.param('password');
        if (name != undefined && password != undefined) {
            dn = config.LDAP_BASE_DN + name;
            authDN(dn, password, (res, err) => {
                if (res) {
                    client.search(dn, {
                        attributes: ['displayName']
                    }, function (error, res) {
                        res.on('searchEntry', function (entry) {
                            let d = Date.now().toString();
                            response.cookie('auth_cookie', d, {
                                maxAge: 60 * 1000 * 10
                            });
                            let ls = JSON.parse(JSON.stringify(entry.object));
                            response.cookie(ls.displayName, d, {
                                maxAge: 60 * 1000 * 10
                            });
                            client.unbind();
                            response.location("/time")
                            response.sendFile(__dirname + '/html/time.html');
                        });
                    })

                } else {
                    response.sendFile(__dirname + '/html/login.html');
                }
            })
        } else {
            response.sendFile(__dirname + '/html/login.html');
        }

    }
}

module.exports = auth, authDN;