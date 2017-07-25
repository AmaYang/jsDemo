/**
 * Created by sophi on 2017/6/21.
 */
var playerStatus = JSON.parse(sessionStorage.getItem("playerStatus"));
var roles = JSON.parse(sessionStorage.getItem("playerRole"));
console.log(roles);
console.log(playerStatus);

for (var i=0; i<roles.length; i++) {
    function  addUnit() {
        $(".row").append(
            '<div class="unit">' +
            '<div class="square">' +
            '<div class="identification">' + roles[i] +
            "</div>" +'<div class="number">' + (i+1) + '号' +
            '</div>' + '</div>' +
            '</div>'
        );
    }
    addUnit();
}

var cards = document.getElementsByClassName("identification");
var suspect;

for (var b = 0; b < roles.length; b++) {
    if (playerStatus[b].status == "dead"||playerStatus[b].status == "voted") {
    cards[b].style.background = "#c0c0c0";
    cards[b].style.cursor = "not-allowed";
    }
    cards[b].index = b;
    cards[b].onclick = function () {
        if (suspect != undefined) {
            cards[suspect].style.background = "#fbb435";
            playerStatus[suspect].status = "alive";
        }
        $(this).css("backgroundColor","#ff0000");
        suspect = this.index;
        playerStatus[this.index].status = "voted";
        console.log(playerStatus);
    }
}

function skipToDecode1() {
    if (suspect == undefined) {
        alert("请杀死一个玩家");
    }
    else {
            for (var x=0; x<playerStatus.length; x++) {
                if (playerStatus[x].status == "alive") {
                    playerStatus[x].day++;
                }
                sessionStorage.setItem("playerStatus",JSON.stringify(playerStatus));
                window.location.href = "js-2-decode.html";
            }
    }
    console.log(sessionStorage);
}