(function(app) {

    'use strict';

    var translations = {
        en: {
            'Твой результат': 'Your result',
            'русских слов': 'russian words',
            'Были отмечены слова, которые в действительности не существуют!': 'You select the word that does not really exist!',
            'Попробуй пройти тест еще раз': 'Try to pass the test again',
            'Пройти тест': 'Take the test'
        }
    };

    app.controller('ResultController', [
        '$scope',
        '$routeParams',
        'storage',
        'i18n',
        function($scope, $routeParams, storage, i18n) {
            i18n.add(translations);
            $scope.knownWords = storage.get('knownWords');
            $scope.isCheating = storage.get('isCheating');
        }
    ]);

})(TYV);
