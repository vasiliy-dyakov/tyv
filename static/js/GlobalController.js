(function(app) {

    'use strict';

    var translations = {
        en: {
            'Протестируй свой словарный запас': 'Test your russian vocabulary',
            'Сколько слов': 'How many',
            'русского': 'russians',
            'английского': 'english',
            'языка ты знаешь?': 'words do you know?',
            'Словарь': 'Words',
            'русский': 'russian',
            'английский': 'english'
        }
    };

    app.controller('GlobalController', [
        '$scope',
        'i18n',
        function($scope, i18n) {

            i18n.add(translations);

            $scope.i18n = i18n.getCurrentTranslations();
            $scope.wordsLang = 'ru';

            i18n.bind('lang:changed', function() {
                $scope.i18n = i18n.getCurrentTranslations();
            });

        }
    ]);

})(TYV);
