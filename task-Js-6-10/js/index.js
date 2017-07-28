/**
 * Created by sophi on 2017/6/28.
*/
app.controller('loginCtrl',function ($scope,$state,$http) {

        //初始化空params
        $scope.params={};

        $scope.getInside = function () {
          $http({
            method: "post",
            url: "/a/login",
            params: $scope.params
        }).then (function success(response) {
            if (response.data.code == 0) {
                $state.go('home.welcome');
            } //else {
               // angular.element("#error2").text("账号或密码错误");
            //}
        }, function error(response) {
            alert("连接出错")
          });
        }
    })