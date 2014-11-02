(function(app) {

    'use strict';

    var StepsController = function($scope, $routeParams, $location) {

        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        $scope.words = ['вода', 'рис', 'музыка', 'спорт', 'задача',
            'собака', 'покер', 'планировщик', 'победа', 'автомобиль',
            'жечь', 'летать', 'мыть', 'слыть', 'шашка',
            'такса', 'маржа', 'филигранный', 'зомби', 'карусель'
        ];

        this.$location = $location;

    };

    StepsController.prototype = {

        knowResult: function() {
            // send and get result and resultId
            var resultId = 123456;
            this.$location.path('/result/' + resultId);
        }

    };

    app.controller('StepsController', ['$scope', '$routeParams', '$location', StepsController]);

})(TYV);
