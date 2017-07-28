/**
 * Created by sophi on 2017/7/8.
 */
// angular.module("theApp")
app.controller('homeCtrl',function ($scope,$http,$stateParams,$state) {

        // 定义一个空对象
        $scope.parmas={};
        // 请求函数
        $scope.searchHom = function() {
            $scope.parmas.startAt = Date.parse($scope.startAt);
            $scope.parmas.endAt = Date.parse($scope.endAt) + (60*60*24*1000-1);
            //将input框里时间（字符串）转换成时间戳，并赋值给param参数，如果搜索当天，则需要将所有的时间换算成毫秒直接加在时间戳后面然后减一
            if (isNaN($scope.parmas.startAt)) {
                $scope.parmas.startAt = ""
            }
            if (isNaN($scope.parmas.endAt)) {
                $scope.parmas.endAt = ""
            }
            //在第一次搜索的时候，没有输入日期，所以$scope.parmas.startAt是空的，所以是一个NaN，这个时候把$scope.parmas.startAt赋值成空字符串
            //$scope.parmas.startAt内容必须为空，可以是数组也可以是字符串，但是不能是对象，空对象里有object,会报错

            $http({
                method: "get",
                url: "/a/article/search",
                params: $scope.parmas
            }).then(function success(response) {
                $scope.totalNum = Math.ceil(response.data.data.total/response.data.data.size);
                console.log($scope.totalNum);
                $scope.upperForm = response.data.data.articleList;

                //动态生成页码按钮
                $scope.pageNum = [];
                for (var i=0; i<$scope.totalNum ; i++) {
                    $scope.pageNum.push(i+1);
                }
            }, function error(response) {
                alert("连接出错")
            });
        };

        console.log($stateParams);
        $scope.parmas = $stateParams;
        $scope.startAt = new Date($scope.parmas.startAt);
        $scope.endAt = new Date($scope.parmas.endAt);
        //将时间戳转换成时间
        $scope.searchHom();

        //判断开始时间是否小于结束时间
        $scope.search = function () {
            if ($scope.parmas.startAt > $scope.parmas.endAt) {
                alert(123)
            }
        };

        //草稿上下线的状态改变
        $scope.changeStatus = function (id) {
            // console.log(id);
            if ($scope.upperForm[this.$index].status == 1) {
                $scope.status = 2;
            } else {
                $scope.status = 1;
            }
            $http ({
                method: "put",
                url: "/a/u/article/status",
                params: {
                    id: id,
                    status: $scope.status
                }
            }).then(function success(response) {
                $scope.searchHom()
            })

        };
        //删除数据
        $scope.delete = function (id) {
            // console.log(id);
            $http ({
                method: "delete",
                url: "/a/u/article/" + id
            }).then(function success(response) {
                $scope.searchHom()
            })
        };
        
        //页面跳转按钮部分
        //点击按钮跳转到首页
        $scope.firstPage = function () {
            $state.go('home.form',{page : 1})
        };
        //点击跳转到上一页
        $scope.prePage = function () {
            if ($scope.parmas.page == 1) {
                $state.go('home.form',{page : $scope.totalNum})
            } else {
                $scope.parmas.page--;
                $state.go('home.form',{page : $scope.parmas.page})
            }
        };
        //点击按钮跳转到对应页
        $scope.xPage = function () {
            $scope.parmas.page = this.$index + 1;
            $state.go('home.form',{page : $scope.parmas.page})
        };
        //点击跳转到下一页
        $scope.nextPage = function () {
            if ($scope.parmas.page == $scope.totalNum) {
                $state.go('home.form',{page : 1})
            } else {
                $scope.parmas.page++;
                $state.go('home.form',{page : $scope.parmas.page})
            }
        };
        //点击跳转到末页
        $scope.lastPage = function () {
            $state.go('home.form',{page : $scope.totalNum})
        };
        //点击跳转到自己输入的那页
        $scope.jumpPage = function () {
            if ($scope.jPage >= 1 && $scope.jPage <= $scope.totalNum) {
                $state.go('home.form',{page : $scope.jPage})
            } else {
                alert("请输入正确的页数")
            }
        };

        //点击编辑内容
        $scope.chgInfo = function (id) {
            console.log(id);
            $http({
                method: "get",
                url: "/a/article/"+ id
            }).then(function success(response) {
                // $state.go("home.add",{});
                console.log(response);
                $state.go('home.add',{id:id});
            });
        };

})

