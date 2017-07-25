/**
 * Created by sophi on 2017/6/23.
 */
var playerStatus = JSON.parse(sessionStorage.getItem("playerStatus"));
var victim = JSON.parse(sessionStorage.getItem("victim"));
var folk = JSON.parse(sessionStorage.getItem("folk"));
var killer = JSON.parse(sessionStorage.getItem("killer"));
var deadKiller = JSON.parse(sessionStorage.getItem("deadKiller"));


console.log(playerStatus);

if (killer !=0) {
    $(".champion-player").append("杀手获胜");
    $(".end1").append("太棒了！你知道么？在捉鬼游戏中只有20%的杀手取得游戏最终的胜利哦！");
} else {
    $(".champion-player").append("平民获胜");
    $(".end1").append("太棒了！你打败了杀手，在游戏中取得了胜利！");
}
var allDay = [];
var day =1;
for (var e=0; e<playerStatus.length; e++) {
    for(var a=0;a<playerStatus.length;a++) {
        if (playerStatus[a].day == day) {
            if(playerStatus[a].status == "dead"||playerStatus[a].status == "voted") {
                allDay.push(playerStatus[a]);
            }
        }

    }
    day++;
}
console.log(allDay);

var aliveFolk = 0;
var deathFolk = 0;
var aliveKiller = 0;
var deathKiller = 0;
function addPlayer() {
    for (var i=0; i<playerStatus.length; i++) {
        if (playerStatus[i].identity == "平民" && playerStatus[i].status == "alive") {
            aliveFolk++;
        } else if (playerStatus[i].identity == "平民" && (playerStatus[i].status == "dead"||playerStatus[i].status == "voted")) {
            deathFolk++;
        } else if (playerStatus[i].identity == "杀手" && playerStatus[i].status == "alive") {
            aliveKiller++;
        } else if (playerStatus[i].identity == "杀手" && (playerStatus[i].status == "dead"||playerStatus[i].status == "voted")) {
            deathKiller++;
        }
    }
    var playerFolk = aliveFolk + deathFolk;
    var playerKiller = aliveKiller + deathKiller;
    $(".killer").append(playerKiller);
    $(".folk").append(playerFolk);
}
addPlayer();

var b = 0;
function addDetails() {
    for (var a=0; a<Math.ceil(allDay.length/2); a++) {
        $('.details').append(
            '<div class="row">' + '<div>' + '<span class="time1">第' + (a + 1) +
            '天</span>' + '<span class="time2">0小时07分</span>' + '</div>' +

            '<div>晚上：' +
            allDay[b].num + '<span class="add-vic">' + "号被杀手杀死，" + "身份是" + '</span>' + allDay[b].identity +
            '</div>' +

            '<div>白天：' +
            allDay[++b].num + '<span class="add-vote">' + "号被投票杀死，" + "身份是" + "</span>" +  allDay[b].identity +
            "</div>" + '</div>'
        );
        b++;
    }
}
addDetails();
