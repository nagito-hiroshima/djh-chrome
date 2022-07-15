//宣言
let tabTitle = "",
    newtabTitle = "",
    key = "",
    forr = 1


//送信
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
            変数名.open('GET', "https://script.google.com/macros/s/AKfycbz3TPwuLcHjwp7Mm0L3ckisCWRNNl7IEh_fuK54MXcGzavhv68iCup39eRL4DTbS67Wrg/exec?p1=" + date + "&p2=" + tabURL + "&p3=" + tabTitle + "&p4=" + key);
            変数名.send();
        }
        tabTitle = document.title;
    }
}

//インターバル
setInterval(() => {
    times()
    chrome.storage.local.get("key", function (value) {
        key = value.key;
    });
    newtabTitle = document.title;
    send()
}, 1000);

//初回送信
send()


//定刻操作
function times() {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var ofweek = now.getDay()

    if (forr == 1 && (ofweek > 1 && ofweek != 6)) {
        //29分 44分 14分 29分

        /*
        9:29:50 stop
        9:44:50 stop

        10:35 start
        10:44:50 stop

        11:35 start
        11:44:50 stop

        12:35 start
        13:14:50 stop
        
        14:05 start
        14:14:50 stop

        15:05 start
        15:14:50 stop

        16:14:50 start

        */

        if (hour == 9 && min == 0 && sec == 25) {//9:30 停止
            start()

            /* 朝礼 */

        } else if (hour == 9 && min == 29 && sec == 50) {//9:30 停止
            stop()

            /* 朝礼 */


        } else if (hour == 9 && min == 44 && sec == 50) {//9:45 停止
            stop()

            /* 1限 */


        } else if (hour == 10 && min == 35 && sec == 25) {//10:35 開始
            //start()

            /* 休憩 */


        } else if (hour == 10 && min == 44 && sec == 50) {//10:45 停止
            stop()

            /* ２限 */

        } else if (hour == 11 && min == 40) {//11:35
            start()

            /* 休憩 */

        } else if (hour == 11 && min == 44 && sec == 50) {//11:45
            stop()

            /* 3限 */

        } else if (hour == 12 && min == 35 && sec == 25) {//12:35
            start()

            /* 休憩 */

        } else if (hour == 13 && min == 14 && sec == 50) {//13:15
            stop()

            /* 4限 */

        } else if (hour == 14 && min == 5 && sec == 25) {//14:05
            start()

            /* 休憩 */

        } else if (hour == 14 && min == 14 && sec == 50) {//14:15
            stop()

            /* 5限 */

        } else if (hour == 15 && min == 5 && sec == 25) {//15:05
            start()

            /* 休憩 */

        } else if (hour == 15 && min == 14 && sec == 50) {//15:15
            stop()

            /* 6限 */

        } else if (hour == 16 && min == 15 && sec == 25) {//16:15
            start()

            /* 放課後 */

        } else {
            setTimeout(() => {
                forr = 1;
            }, 60000);
        }
    }
}

function stop() {
    let timerid = setInterval(() => {
        // ボリュームが0になったら終了
        if ((document.getElementsByClassName('video-stream')[0].volume - 0.01) <= .0) {
            document.getElementsByClassName('video-stream')[0].volume = 0.0;
            document.getElementsByClassName('video-stream')[0].pause();
            document.getElementsByClassName("ytp-mute-button")[0].click();
            clearInterval(timerid);  //タイマー解除
        }
        // 0.1ずつボリュームを減らしていく
        else {
            document.getElementsByClassName('video-stream')[0].volume -= 0.01;
        }
    }
        , 100); //0.2秒ごとに繰り返す
    forr = 0;//クールタイムを設定
}

function start() {
    document.getElementsByClassName("ytp-mute-button")[0].click();
    document.getElementsByClassName('video-stream')[0].volume = 0.0;
    document.getElementsByClassName('video-stream')[0].play();
    let timerid = setInterval(() => {
        // ボリュームが1になったら終了
        if ((document.getElementsByClassName('video-stream')[0].volume + 0.01) >= 0.37) {
            document.getElementsByClassName('video-stream')[0].volume = 0.37;
            clearInterval(timerid);  //タイマー解除
        }
        // 0.1ずつボリュームを足していく
        else {
            document.getElementsByClassName('video-stream')[0].volume += 0.01;
        }
    }
        , 100); //0.2秒ごとに繰り返す
    forr = 0;//クールタイムを設定
}