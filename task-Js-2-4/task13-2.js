/**
 * Created by sophi on 2017/6/13.
 */
var roles = JSON.parse(sessionStorage.getItem("playerRole"));
var num = window.sessionStorage.getItem("number");
console.log(roles);
console.log(num);

for (var i=0; i<num; i++) {
    function  addUnit() {
        $(".row").append(
            '<div class="unit">' +
            '<div class="square">' +
            '<div class="identification">' + roles[i] +
            "</div>" +'<div class="number">' + (i+1) + '号' +
            '</div>' + '</div>' +
            '<img class="cover" src="taskimage/task13images/cover-pic.png">' +
            '</div>'
        );
    }
    addUnit();
}
console.log(i);

function skipToDiary() {
    window.location.href = "js-2-diary.html";
}





