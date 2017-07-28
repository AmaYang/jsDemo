/**
 * Created by sophi on 2017/7/5.
 */
var app = angular.module("theApp", ["ui.router","oc.lazyLoad","angularFileUpload"])
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/login");

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "view/login.htm-l",
            controller:'loginCtrl',
            resolve: {
                    loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'css/index.css'
                            // 'js/index.js'
                        ])
                    }]
            }
        })

        .state("home", {
            url:"/home",
            templateUrl: "view/home.html"
        })

        .state("home.welcome", {
            url:"/welcome",
            templateUrl: "view/welcome.html"
        })


        .state("home.add", {
            url:"/add?id",
            templateUrl: "view/add.html",
            controller:'homeAddCtrl',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'dist/css/wangEditor.min.css',
                        'pic/communityDirectives.js',
                        'dist/js/wangEditor.min.js',
                        'js/add.js',
                        'js/constant.js',
                        '//cdn.bootcss.com/angular-file-upload/2.1.4/angular-file-upload.min.js'
                    ])
                }]
            }
        })
        .state("home.form", {
            url:"/home?type&status&startAt&endAt&size&page",
            templateUrl: "view/form.html",
            controller:'homeCtrl',
            resolve: {
                loadFile: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/filter.js'
                        // 'js/home.js'
                    ])
                }]
            }
        })





});
