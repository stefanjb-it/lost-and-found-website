const express = require('express');
const filehandler = require('express-fileupload');
const db = require('./DB_access');
const app = express();

app.use(filehandler());
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/images'))
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
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html')
})
app.get('/loading', (req, res) => {
    res.sendFile(__dirname + '/html/loading.html')
})
app.get('/info', (req, res) => {
    res.sendFile(__dirname + '/html/info.html')
})

app.post('/file', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        let filename = file.name;

        file.mv(__dirname + '/uploads/' + filename).catch(console.error);
    }
})
app.post('/item', (req, res) => {
    let item = JSON.parse(req.body);
    console.log(item);
    db.add_item(item.found, item.loc_bef, item.loc_now, item.fileconn, item.cat);
})

app.get('/listing', (req, res) => {
    db.get_list(function(result) {
        res.send(result);
    })
})

app.listen(5000);