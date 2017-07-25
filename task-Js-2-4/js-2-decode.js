/**
 * Created by sophi on 2017/6/19.
 */
var playerStatus = JSON.parse(sessionStorage.getItem("playerStatus"));
console.log(playerStatus);
var killer = 0;
var folk = 0;
var victim = 0;
var deadKiller = 0;

for (var w=1; w<playerStatus.length; w++) {
    for (var i=0; i<playerStatus.length; i++) {
        if (playerStatus[i].day == w) {
            console.log(w);
            console.log(playerStatus[i].day);
            if (playerStatus[i].status == "dead") {
                $(".container").append(
                    "<p>" + playerStatus[i].num + "号玩家被杀死了，真实身份是" + playerStatus[i].identity + "</p>"
                );
            }
            if (playerStatus[i].status == "voted") {
                $(".container").append(
                    "<p>" + playerStatus[i].num + "号玩家被投票杀死了，真实身份是" + playerStatus[i].identity + "</p>"
                );
            }
        }
    }
}

for (var a=0; a<playerStatus.length; a++) {

    if (playerStatus[a].status == "dead" || playerStatus[a].status == "voted" ) {
        if (playerStatus[a].identity == "平民") {
            victim++;
        } else {
            deadKiller++;
        }
    } else if (playerStatus[a].status == "alive") {
        if (playerStatus[a].identity == "平民") {
            folk++;
        } else {
            killer++;
        }
    }
}

sessionStorage.setItem("victim",JSON.stringify(victim));
sessionStorage.setItem("folk",JSON.stringify(folk));
sessionStorage.setItem("killer",JSON.stringify(killer));
sessionStorage.setItem("deadKiller",JSON.stringify(deadKiller));
console.log(victim);
console.log(folk);
console.log(killer);
console.log(deadKiller);

if (folk <= killer) {
    $("#skip-button").append("杀手获胜，查看结果").click(function () {
        window.location.href = "task7-3.html";
    })
} else if (killer == 0) {
    $("#skip-button").append("平民获胜，查看结果").click(function () {
        window.location.href = "task7-3.html";
    })
} else if (folk > killer) {
    $("#skip-button").append("天亮了").click(function () {
        window.location.href = "js-2-diary.html";
    })
}
