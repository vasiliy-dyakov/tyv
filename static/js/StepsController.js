define(['app', 'storage', 'i18n', 'angular', 'angular-route'], function(app) {

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
        this.$http = $http;
        this.storage = storage;
        this.i18n = i18n;

        i18n.add(translations);

        $scope.stepsCount = 2;
        $scope.step = +$routeParams.stepNum;
        $scope.nextStep = $scope.step < $scope.stepsCount ? $scope.step + 1 : false;

        if ($scope.step > 1 && typeof storage.get('currentResultRounded') === 'undefined') {
            this.redirect('/');
        }

        this._load($scope.step);

        i18n.bind('wordsLang:changed', function() {
            this.redirect('/');
        }.bind(this));

    };

    StepsController.prototype = {

        _load: function(step) {
            if (step === 1) {
                this.$http.get('/data/' + this.i18n.getWordsLang() + '/words1.json').success(function(data) {
                    this.$scope.words = data.words.map(function(word) {
                        return _.extend({
                                checked: false
                            }, word);
                    });
                    this.storage.set('dictionarySize', data.dictionarySize);
                    this.storage.set('stepSize', data.stepSize);
                }.bind(this));
            } else {
                this.$http.get('/data/' + this.i18n.getWordsLang() + '/words2.json').success(function(data) {
                    this.$scope.words = data[this.storage.get('currentResultRounded')].map(function(word) {
                        return _.extend({
                                checked: false
                            }, word);
                    });
                }.bind(this));
            }
        },

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
                knownWords,
                maxPosibleRound,
                dictionarySize = this.storage.get('dictionarySize'),
                stepSize = this.storage.get('stepSize');

            isCheating && this.storage.set('isCheating', isCheating);

            if (this.$scope.step === 1) {

                currentResult = Math.floor(dictionarySize * checkedCount / this.$scope.words.length);
                this.storage.set('currentResult', currentResult);
                currentResultRounded = Math.round(Math.floor(currentResult / stepSize) * stepSize);
                this.storage.set('currentResultRounded', currentResultRounded);

            } else {

                maxPosibleRound = dictionarySize - dictionarySize % stepSize;

                knownWords = this.storage.get('currentResultRounded') +
                    Math.round(
                        (this.storage.get('currentResultRounded') < maxPosibleRound
                            ? stepSize
                            : dictionarySize % stepSize
                        )
                        * checkedCount
                        / this.$scope.words.length
                    );
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

});
