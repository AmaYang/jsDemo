/**
 * Created by Master on 2017/3/22.
 */

'use strict';
app

/*传图片*/
    .directive('upLoader',[
        //directive是注册指令，后面的内容会被注册成一个html标签
        'FileUploader',
        function (
            FileUploader
        ) {
            return {
                restrict: 'E', //改变dom的命令，E 表示该指令是一个element; A 表示该指令是attribute（属性）; C 表示该指令是class; M 表示该指令是注释
                templateUrl: '/pic/upload.html',
                scope: {
                    logoUrl: '=ngModel',//图片上传后地址
                    labelName: '@',
                    tip:'@'//提示语
                },
                replace: 'true',
                link: function (scope) {

                    scope.uploader = new FileUploader({//实例化
                        url: '/a/u/img/task',
                        queueLimit: 1
                    });
                    scope.clearItem = function () {//清空队列
                        scope.uploader.clearQueue()
                    };
                    scope.remove = function () {
                        scope.logoUrl = '';
                    };
                    scope.getUrl = function (files) {
                        scope.fileList = files;
                        scope.imgURL = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
                    };
                    scope.uploader.onSuccessItem = function (item, response) {//上传成功返回地址
                        scope.logoUrl = response.data.url
                    }
                }
            }
        }]);
