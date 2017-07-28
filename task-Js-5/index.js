/**
 * Created by sophi on 2017/6/28.
 // */
var uName = document.getElementById("username");
var psw = document.getElementById("psw");
var error1 = document.getElementById("error1");
var error2 = document.getElementById("error2");

function checkName() {
    if (uName.value.length<5 || uName.value.length>10) {
        error1.innerHTML = "用户名长度必须在5至20位之间";
    }
}

function checkPwd() {
    if (psw.value.length<4 || psw.value.length>10) {
        error2.innerHTML = "密码长度必须在4~10位之间";
    }
}

$("#getInside").click(function () {
    $.ajax({
        type: "POST",
        url: "/a/login",
        data: {
            name:$('#username').val(),
            pwd:$('#psw').val()
//                name: 'admin',
//                pwd: '123456'
        },
        success: function (data) {
            var data1 = JSON.parse(data);
            if (data1.code == 0) {
                window.location.href = "https://www.jnshu.com/"
            }
            else {
                alert("账号或密码错误")
            }
        }
    })
});
