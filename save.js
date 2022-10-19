const db = require('./DB_access');

module.exports = {
    submitHandler(req, res) {

        const body = req.body;
        const file = req.files.ImageUpload;
        const cookies = JSON.stringify(req.cookies);
        console.log(cookies);


        if (cookies == undefined) {
            res.sendFile(__dirname + '/html/login.html')
            return false;
        }
        let cookie_split = cookies.split(',');
        cookie_split[0] = cookie_split[0].slice(1);
        cookie_split[1] = cookie_split[1].slice(0, (cookie_split[1].length) - 1);
        cookie_split[0] = cookie_split[0].replace(/\"/g, "");
        cookie_split[1] = cookie_split[1].replace(/\"/g, "");
        console.log(cookie_split[0]);
        console.log(cookie_split[1]);
        let cookie_1 = cookie_split[0].split(':');
        let cookie_2 = cookie_split[1].split(':');

        let finder = "";

        if (cookie_1[1] === cookie_2[1]) {
            let tmp = cookie_2[0].split('_');
            finder = tmp[0] + " " + tmp[1];
        } else {
            res.sendFile(__dirname + '/html/login.html')
        }
        console.log(finder);

        const patt = /\.[0-9a-z]+$/i;

        let d = Date.now().toString();
        d = Array.from(d);
        d = d.slice(6);

        const filename = d.join("") + file.name.match(patt);
        console.log(filename);
        file.mv(__dirname + '/uploads/' + filename).catch(console.error);
        console.log(body);

        db.add_item(finder, body.location_before, body.location_now, filename, body.cat);
        return true;
    }
}