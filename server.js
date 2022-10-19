const express = require('express');
const fs = require('fs');
const filehandler = require('express-fileupload');
const db = require('./DB_access');
const app = express();
const cookieParser = require('cookie-parser');
const auth = require('./auth');
const save = require('./save');
const https = require('https');

app.use(filehandler());
app.use(cookieParser());
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/css'));
app.use(auth);
app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/uploads'))
app.use(express.text());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})
app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/html/create.html')
})
app.get('/list', (req, res) => {
    res.sendFile(__dirname + '/html/list.html')
})
app.get('/loading', (req, res) => {
    res.sendFile(__dirname + '/html/loading.html')
})
app.get('/info*', (req, res) => {
    res.sendFile(__dirname + '/html/info.html')
})
app.post('/create', (req, res) => {
    setTimeout(() => {
        res.sendFile(__dirname + '/html/list.html')
    }, 1500);
})

app.get('/listing', (req, res) => {
    db.get_list(function (result) {
        res.send(result);
    })
})

app.post('/listing_cat', (req, res) => {
    let cat = JSON.parse(req.body);
    db.get_list_by_cat(cat.cat, function (result) {
        res.send(result);
    })
})

app.post('/info', (req, res) => {
    let id = JSON.parse(req.body);
    db.get_item(id.url_id, function (result) {
        res.send(result);
    })
})

app.post('/remove_item', (req, res) => {
    let re = JSON.parse(req.body);
    db.remove_item(re.url_re);
    setTimeout(() => {
        res.sendFile(__dirname + '/html/list.html')
    }, 100);
})

app.post('/file', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let filename = file.name;
        file.mv(__dirname + '/uploads/' + filename).catch(console.error);
    }
    res.end();
})
app.post('/item', (req, res) => {
    let item = JSON.parse(req.body);
    db.add_item(item.found, item.loc_bef, item.loc_now, 
        item.fileconn, item.cat);
    res.sendFile(__dirname + '/html/list.html');
})


https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app)
    .listen(443, function () {
        console.log('LostandFound app listening on port 443!'+ 
            'Go to https://lostandfound.stevenelectric.icu:443/')
    })