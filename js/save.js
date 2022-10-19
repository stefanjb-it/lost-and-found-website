function submitHandler() {

    let found_by;
    let location_bf = document.getElementsByName("location_before")[0].value
    let location_now = document.getElementsByName("location_now")[0].value
    let category = document.getElementsByName("cat")[0].value
    let file = document.getElementById("realbtn");
    const cookies = document.cookie;
    if (cookies == undefined) {
        window.location.replace("ttps://lostandfound.stevenelectric.icu/")
    }
    let cookie_split = cookies.split(';');
    let cookie_1 = cookie_split[0].split('=');
    let cookie_2 = cookie_split[1].split('=');

    if (cookie_1[1] === cookie_2[1]) {
        let tmp = cookie_2[0].slice(1).split('_');
        found_by = tmp[0] + " " + tmp[1];
    } else {
        window.location.replace("https://lostandfound.stevenelectric.icu/")
    }

    const patt = /\.[0-9a-z]+$/i;

    let d = Date.now().toString();
    d = Array.from(d);
    d = d.slice(6);

    const filename = d.join("") + file.files[0].name.match(patt);
    file.files[0].filename = filename;
    const formData = new FormData();

    formData.append("file", file.files[0], filename);

    fetch('/file', {
        method: "post",
        body: formData
    }).catch(console.error);

    const item = {
        found: found_by,
        loc_bef: location_bf,
        loc_now: location_now,
        fileconn: filename,
        cat: category
    }

    fetch('/item', {
        method: "post",
        body: JSON.stringify(item)
    }).catch(console.error);

    location.replace("/list")
}