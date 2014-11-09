(function(app) {

    'use strict';

    var translations = {
        en: {
            'Протестируй свой словарный запас': 'Test your russian vocabulary',
            'Сколько слов русского языка ты знаешь?': 'How many russians words do you know?'
        }
    };

    app.controller('GlobalController', [
        '$scope',
        'i18n',
        function($scope, i18n) {

            i18n.add(translations);

            $scope.i18n = i18n.getCurrentTranslations();

            i18n.bind('lang:changed', function() {
                $scope.i18n = i18n.getCurrentTranslations();
            });

        }
    ]);

})(TYV);
