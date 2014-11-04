(function(app) {

    'use strict';

    var StepsController = function($scope, $http, $routeParams, $location, storage) {

        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        if ($scope.step === 1) {
            $http.get('/data/words1.json').success(function(data) {
                $scope.words = data.map(function(word) {
                    return {
                        value: word,
                        checked: false
                    };
                });
            });
        } else {
            $http.get('/data/words2.json').success(function(data) {
                $scope.words = data[storage.get('currentResult')].map(function(word) {
                    return {
                        value: word,
                        checked: false
                    };
                });
            });
        }

        this.$scope = $scope;
        this.$location = $location;
        this.storage = storage;

    };

    StepsController.prototype = {

        calcStep: function() {
            var checkedCount = _.where(this.$scope.words, { checked: true }).length,
                currentResult,
                knownWords;

            if (this.$scope.step === 1) {

                currentResult = Math.floor(30000 * checkedCount / this.$scope.words.length);
                // округляем до нижних 5000
                currentResult = Math.round(Math.floor(currentResult / 5000) * 5000);
                this.storage.set('currentResult', currentResult);

            } else {

                knownWords = this.storage.get('currentResult') +
                    Math.round(5000 * checkedCount / this.$scope.words.length);
                this.storage.set('knownWords', knownWords);

            }

            this.redirect();
        },

        redirect: function() {
            this.$location.path(this.$scope.nextStep ? '/step/' + this.$scope.nextStep : '/result');
        }

    };

    app.controller('StepsController', [
        '$scope',
        '$http',
        '$routeParams',
        '$location',
        'storage',
        StepsController
    ]);

})(TYV);
