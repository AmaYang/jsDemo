/**
 * Created by sophi on 2017/6/19.
 */
var roles = JSON.parse(sessionStorage.getItem("playerRole"));
console.log(roles);
var roleStatus = [];
// var allDead = [];

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
    if (sessionStorage.getItem("playerStatus")) {
        var playerStatus = JSON.parse(sessionStorage.getItem("playerStatus"));
    } else {
        roleStatus[i] = {};
        roleStatus[i].num = i+1;
        roleStatus[i].identity = roles[i];
        roleStatus[i].status = "alive";
        roleStatus[i].day = 1;
    }
}
console.log(playerStatus);

var cards = document.getElementsByClassName("identification");
for (var j = 0; j < roles.length; j++) {
    if (roles[j] == "杀手") {
        cards[j].style.background = "#c0c0c0";
        cards[j].style.cursor = "not-allowed";
    }
    if (sessionStorage.getItem("playerStatus")) {
        if (roles[j] == "杀手"||playerStatus[j].status == "dead"||playerStatus[j].status == "voted") {
            cards[j].style.background = "#c0c0c0";
            cards[j].style.cursor = "not-allowed";
        }
    }
}
var victim;
for (var b = 0; b < roles.length; b++) {
    cards[b].index = b;
    cards[b].onclick = function () {
        console.log(roleStatus);
        if (roles[this.index] == "杀手") {
            return false  //确保点击杀手无任何作用
        } else {
            if (victim != undefined) {
                //先检查有没有被选中的人，如果有则将其状态颜色还原
                cards[victim].style.background = "#fbb435";
                roleStatus[victim].status = "alive";
            }
            $(this).css("backgroundColor","#ff0000");
            victim = this.index;
            if (sessionStorage.getItem("playerStatus")) {
                playerStatus[this.index].status = "dead";
            } else {
                roleStatus[this.index].status = "dead";
            }
            console.log(playerStatus);
        }
    }
}


function skipToDecode() {
    if (victim == undefined) {
        alert("请杀死一个平民");
    }
    else {
        if (sessionStorage.getItem("playerStatus")) {
            sessionStorage.setItem("playerStatus",JSON.stringify(playerStatus));
        } else {
            sessionStorage.setItem("playerStatus",JSON.stringify(roleStatus));
        }
        console.log(playerStatus);
        window.location.href = "js-2-decode.html";
    }
}
