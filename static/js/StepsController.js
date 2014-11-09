(function(app) {

    'use strict';

    var translations = {
        en: {
            'Укажи те слова, у которых знаешь хотя бы одно значение.': 'Check words you know at least one definition for.',
            'Не указывай слова, которые встречал, но в значении сомневаешься.': 'Do not check words you have seen before, but whose meaning you are not exactly sure of.',
            'Шаг': 'Step',
            'из': 'of',
            'Далее': 'Next',
            'Узнать результат': 'Know the result'
        }
    };

    var StepsController = function($scope, $http, $routeParams, $location, storage, i18n) {

        this.$scope = $scope;
        this.$location = $location;
        this.storage = storage;

        i18n.add(translations);

        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        if ($scope.step > 1 && typeof storage.get('currentResultRounded') === 'undefined') {
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
                $scope.words = data[storage.get('currentResultRounded')].map(function(word) {
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
                currentResultRounded,
                knownWords;

            isCheating && this.storage.set('isCheating', isCheating);

            if (this.$scope.step === 1) {

                currentResult = Math.floor(48000 * checkedCount / this.$scope.words.length);
                this.storage.set('currentResult', currentResult);
                // округляем до нижних 10000
                currentResultRounded = Math.round(Math.floor(currentResult / 10000) * 10000);
                this.storage.set('currentResultRounded', currentResultRounded);

            } else {

                knownWords = this.storage.get('currentResultRounded') +
                    Math.round((this.storage.get('currentResultRounded') < 40000 ? 10000 : 8000) * checkedCount / this.$scope.words.length);
                knownWords = Math.round((this.storage.get('currentResult') + knownWords) / 2);
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
        'i18n',
        StepsController
    ]);

})(TYV);
