'use strict';

var TYV = angular.module('TYV', ['ngRoute', 'ngCookies']);

TYV.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/step/:stepNum', {
            templateUrl: 'stepsView',
            controller: 'StepsController as controller'
        })
        .when('/result/', {
            templateUrl: 'resultView',
            controller: 'ResultController'
        })
        .otherwise({
            redirectTo: '/step/1'
        });
    }
]);
