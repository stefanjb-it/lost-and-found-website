window.onload = function getInfo() {

    let url = window.location.href;
    url = url.split('=')[1]

    let id = {
        url_id: url
    }

    fetch('/info', {
        method: "post",
        body: JSON.stringify(id)
    }).then(response => response.text()).then(data => {
        let item = JSON.parse(data);

        var html = '<img src="' + item[0].picture + '" class="postImg" id=picture/><br>';
        html += '<div class="inner">';
        html += '<h5 id=found_by>Finder: ' + item[0].found_by + '</h5>';
        html += '<h5 id=loc_bf>Fundort: ' + item[0].location_bf + '</h5>';
        html += '<h5 id=loc_now>Aktueller Standort: ' + item[0].location_now + '</h5>';
        html += '</div>';
        document.getElementById("container").innerHTML = html;
    })
}

var collected = document.getElementById("collected");
collected.addEventListener("click", function () {
    let url_re = window.location.href;
    url_re = url_re.split('=')[1]

    let re = {
        url_re: url_re
    }
    fetch('/remove_item', {
        method: "post",
        body: JSON.stringify(re)
    })
    location.replace("/list")
    location.reload();
})