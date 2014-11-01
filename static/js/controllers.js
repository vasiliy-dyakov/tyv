'use strict';

var TYV = angular.module('TYV', ['ngRoute']);

TYV.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/step/:stepNum', {
            templateUrl: 'steps',
            controller: 'StepsController'
        })
        .otherwise({
            redirectTo: '/step/1'
        });
    }
]);

TYV.controller('StepsController', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.stepsCount = 3;
    $scope.step = +$routeParams.stepNum;
    $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

    $scope.words = ['вода', 'рис', 'музыка', 'спорт', 'задача',
        'собака', 'покер', 'планировщик', 'победа', 'автомобиль',
        'жечь', 'летать', 'мыть', 'слыть', 'шашка',
        'такса', 'маржа', 'филигранный', 'зомби', 'карусель'
    ];
}]);
