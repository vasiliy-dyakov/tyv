define(['angular', 'angular-route', 'angular-cookies'], function() {

    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.config(['$routeProvider', function($routeProvider) {
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

    return app;

});
