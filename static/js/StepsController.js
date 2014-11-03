(function(app) {

    'use strict';

    var StepsController = function($scope, $http, $routeParams, $location) {

        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        $http.get('/data/words1.json').success(function(data) {
            $scope.words = data;
        });

        this.$location = $location;

    };

    StepsController.prototype = {

        knowResult: function() {
            // send and get result and resultId
            var resultId = 123456;
            this.$location.path('/result/' + resultId);
        }

    };

    app.controller('StepsController', ['$scope', '$http', '$routeParams', '$location', StepsController]);

})(TYV);
