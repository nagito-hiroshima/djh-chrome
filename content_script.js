let tabTitle = "",
    newtabTitle = "",
    key = ""

function send() {
    if (tabTitle != newtabTitle) {
        let tabURL = window.location.href;
        tabURL = tabURL.replace('https://www.youtube.com/watch?v=', '')
        console.log(tabURL)

        tabTitle = document.title;
        tabTitle = tabTitle.replace('- YouTube', '')

        let date = new Date()
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate();
        const hh = date.getHours();
        const mm = date.getMinutes();
        const ss = date.getSeconds();
        date = y + "/" + m + "/" + d + " " + hh + ":" + mm + ":" + ss




        if (tabTitle != "YouTube") {
            var 変数名 = new XMLHttpRequest();
            変数名.open('GET', "https://script.google.com/macros/s/AKfycbwGEGyO29F5qEDnn5QmZM5lnzrJ94O2szNYHcylJy2VC1YZ81r7wdAJkxDxBbjqxfjHPQ/exec?p1=" + date + "&p2=" + tabURL + "&p3=" + tabTitle + "&p4=" + key);
            変数名.send();
        }
        tabTitle = document.title;
    }
}

setInterval(() => {
    chrome.storage.local.get("key", function(value) {
        key = value.key;
    });
    newtabTitle = document.title;
    send()
}, 1000);

send()