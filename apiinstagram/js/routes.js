(function () {
    'use strict';

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Redirect any unresolved url
    $urlRouterProvider.otherwise("/home");

    $stateProvider

        .state('Login', {
            url: "/login",
            templateUrl: "/apiinstagram/templates/views/login.html",
            data: {pageTitle: 'Login', pageSubTitle: ''},
            controller: "loginController"
      
        })        
        .state('Home', {
            url: "/home",
            templateUrl: "/apiinstagram/templates/views/home.html",
            data: {pageTitle: 'Home', pageSubTitle: ''},
            controller: "homeController"
      
        })
        .state('Followed', {
            url: "/followed",
            templateUrl: "/apiinstagram/templates/views/followed.html",
            data: {pageTitle: 'followed', pageSubTitle: ''},
            controller: "followedController"
      
        })
        .state("authentication", {
            url: "/authentication/:accessToken",
            templateUrl: "/apiinstagram/templates/views/authentication.html",
            data: {pageTitle: 'Login', pageSubTitle: ''},
            controller: "authenticationController"
        })

        }]);
}());



