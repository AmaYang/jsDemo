/**
 * Created by sophi on 2017/6/9.
 */
//通过滚动条和按钮调整玩家人数
var playerMember = document.getElementById("member");
var rangeNumber = document.getElementById("slider");

function change_member() {
    if (playerMember.value>=4 && playerMember.value<=18) {
        playerMember.value = rangeNumber.value;
    } else {
        alert("请输入正确的人数4~18");
        playerMember.value = 4;
        rangeNumber.value = 4;
    }
}
function range_slide() {
    playerMember.value = rangeNumber.value;
}

function minus() {
    rangeNumber.value--;
    playerMember.value = rangeNumber.value;
    if (playerMember.value<4) {
        alert("参与人数最少为4人yo~");
        playerMember.value = 4;
    } else {
        playerMember.value = rangeNumber.value;
    }
}
function plus() {
    rangeNumber.value++;
    playerMember.value = rangeNumber.value;
    if (playerMember.value>18) {
        alert("参与人数最多为18人yo~");
        rangeNumber.value = 18;
    } else {
        playerMember.value = rangeNumber.value;
    }
}

//分配玩家身份
var killer = [];
var killerNum = document.getElementById("killerNum");
var folkNum = document.getElementById("folkNum");
var playerNum = {};
var num = [];

function member_setting() {
    if (playerMember.value>=4 && playerMember.value<=8) {
        killer.length = 1;
    } else if (playerMember.value>=9 && playerMember.value<=11) {
        killer.length = 2;
    } else if (playerMember.value>=12 && playerMember.value<=15) {
        killer.length = 3;
    } else {
        killer.length = 4;
    }
    console.log(killer.length);
    killerNum.value = killer.length;
    folkNum.value = playerMember.value-killer.length;

    playerNum.length = playerMember.value;
    for (var a=0; a<playerMember.value; a++) {
        playerNum[a] = "平民";
    }
    for (var b=0; b<killerNum.value; b++) {
        num[b] = (Math.floor(Math.random() * (playerMember.value)));
        if (num.indexOf(num[b]) < 0) {
            num.push(num[b]);
        }
        playerNum[num[b]] = "杀手";
    }
    console.log(playerNum);
}
function add() {

    member_setting();
    var player = "";
    for (var y=0; y<playerNum.length; y++) {
        player +=  '<div class="detail">' +
            '<span class="detail-role">'+playerNum[y]+'</span >'+
            '<span class="detail-num">' +(y+1)+ '号</span> '+
            '</div>';
    }
    $(".container").eq(0).html(player); // 使用jQuery向元素container元素本身中插入html元素
}

function skip() {
    if (killer.length != 0) {
        sessionStorage.setItem("playerRole",JSON.stringify(playerNum));
        sessionStorage.setItem("number",rangeNumber.value);
        // sessionStorage.getItem("number",playerMember.value);
        window.location.href = "js-2-identification.html";
    } else {
        alert("请设置身份");
    }
}
