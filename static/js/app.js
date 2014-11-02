'use strict';

var TYV = angular.module('TYV', ['ngRoute']);

TYV.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/step/:stepNum', {
            templateUrl: 'stepsView'
        })
        .when('/result/:resultId', {
            templateUrl: 'resultView',
            controller: 'ResultController'
        })
        .otherwise({
            redirectTo: '/step/1'
        });
    }
]);

