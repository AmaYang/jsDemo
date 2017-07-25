/**
 * Created by sophi on 2017/6/10.
 */
var roles = JSON.parse(sessionStorage.getItem("playerRole"));
var num = window.sessionStorage.getItem("number");
console.log(roles);
console.log(num);


var step = 1;
var i = 0;
var b = 1;
$(".nub-a").html(step);
function skipToId() {
    if (i < num-1) {
        $(".ids").html(roles[i]);
        console.log(roles[i]);
        $(".idCard").css("display","block");
        $(".identification").css("display","none");
        $("#end").css("display","none");
        step++;
        $(".nub-a").html(step);
        $(".nub-b").html(b);
        i++;
        b++;
    } else if (i=num) {
        $(".ids").html(roles[(i-1)]);
        console.log(roles[(i-1)]);
        $(".idCard").css("display","block");
        $(".identification").css("display","none");
        $("#start").css("display","none");
        $("#end").css("display","block");
        $(".nub-b").html(b);
    }
}
function skipToBench() {
    window.location.href = "task13-2.html";
}
function skipToNum() {
    $(".idCard").css("display","none");
    $(".identification").css("display","block");
    $("#end").css("display","none");
}