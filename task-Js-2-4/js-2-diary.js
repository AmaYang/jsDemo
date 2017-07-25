/**
 * Created by sophi on 2017/6/19.
 */
var playerStatus = JSON.parse(sessionStorage.getItem("playerStatus"));
console.log(playerStatus);

function kill() {
    window.location.href = "task13-2-kill.html";
}

function ghost() {
    alert("亡灵请发言");
}

function states() {
    alert("请玩家依次发言");
}

function killAgain() {
    window.location.href = "task13-2-vote.html";
}