(function(app) {

    'use strict';

    var StepsController = function($scope, $http, $routeParams, $location, storage) {

        this.$scope = $scope;
        this.$location = $location;
        this.storage = storage;


        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        if ($scope.step > 1 && typeof storage.get('currentResult') === 'undefined') {
            this.redirect('/');
        }

        if ($scope.step === 1) {
            $http.get('/data/words1.json').success(function(data) {
                $scope.words = data.map(function(word) {
                    return _.extend({
                            checked: false
                        }, word);
                });
            });
        } else {
            $http.get('/data/words2.json').success(function(data) {
                $scope.words = data[storage.get('currentResult')].map(function(word) {
                    return _.extend({
                            checked: false
                        }, word);
                });
            });
        }

    };

    StepsController.prototype = {

        calcStep: function() {
            var isCheating = _.where(this.$scope.words, {
                        phony: true,
                        checked: true
                    }).length > 0,
                checkedCount = _.where(this.$scope.words, {
                        phony: false,
                        checked: true
                    }).length,
                currentResult,
                knownWords;

            isCheating && this.storage.set('isCheating', isCheating);

            if (this.$scope.step === 1) {

                currentResult = Math.floor(48000 * checkedCount / this.$scope.words.length);
                // округляем до нижних 10000
                currentResult = Math.round(Math.floor(currentResult / 10000) * 10000);
                this.storage.set('currentResult', currentResult);

            } else {

                knownWords = this.storage.get('currentResult') +
                    Math.round((this.storage.get('currentResult') < 40000 ? 10000 : 8000) * checkedCount / this.$scope.words.length);
                this.storage.set('knownWords', knownWords);

            }

            this.redirect(this.$scope.nextStep ? '/step/' + this.$scope.nextStep : '/result');
        },

        redirect: function(path) {
            this.$location.path(path);
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
