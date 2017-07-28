/**
 * Created by sophi on 2017/7/15.
 */
angular.module("theApp")
    .controller('homeAddCtrl',function ($scope,$http,$state,$stateParams,ops,opts) { //$state等同于$stateParams，ops,opts是自己定义的常量

    var editor = new wangEditor ('div1');
    editor.create();

    $scope.params = {};
    //将自己定义的常量赋值给变量
    $scope.ops=ops;
    $scope.opts=opts;

    //取消编辑
    $scope.cancel = function () {
        $state.go('home.form',{page: 1})
    };

    //当内容为编辑时，首先要根据id得到全部对应内容
    $http({
        method: "get",
        url: "/a/article/" + $stateParams.id
    }).then(function success(response){
        $scope.params=response.data.data.article;
        editor.$txt.html($scope.params.content)
    });


    $scope.online = function (sta) {
        //根据ng-click点击事件触发函数传参，判断状态是上线还是草稿
        if (sta == 2) {
            $scope.params.status = 2
        } else {
            $scope.params.status = 1
        }

        if ($stateParams.id == undefined) {
            //没有id，内容为新增，上线内容
            //通过赋值方式绑定editor内容
            $scope.params.content = editor.$txt.html();

            $http({
                method: "post",
                url: "/a/u/article",
                params: $scope.params
            }).then(function success(response) {
                $state.go('home.form',{page:1})
            });

        } else {
            //有id，状态是新增
            $scope.params.content = editor.$txt.html();
            $http({
                method: "put",
                url: "/a/u/article/" + $stateParams.id,
                params:$scope.params
            }).then(function success(response){
                $state.go('home.form',{page:1})
            });
        }

    };
 });





