define(['angular', 'angular-route', 'angular-cookies'], function() {

    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/step/:stepNum', {
                templateUrl: 'partials/steps.html',
                controller: 'StepsController as controller'
            })
            .when('/result/', {
                templateUrl: 'partials/result.html',
                controller: 'ResultController'
            })
            .otherwise({
                redirectTo: '/step/1'
            });
        }
    ]);

    return app;

});
