function submitHandler() {

    let found_by = document.getElementsByName("found_by")[0].value;
    let location_bf = document.getElementsByName("location_before")[0].value
    let location_now = document.getElementsByName("location_now")[0].value
    let category = document.getElementsByName("cat")[0].value
    const file = document.getElementById("realbtn");

    if (found_by == undefined || location_bf == undefined || location_now == undefined || category == undefined) {
        window.alert = "ALARM";
        setTimeout(1);
        window.location = "/create";
    }

    const patt = /\.[0-9a-z]+$/i;

    let d = Date.now().toString();
    d = Array.from(d);
    d = d.slice(6);

    const filename = d.join("") + file.files[0].name.match(patt);
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

    window.location.replace("/list");
}