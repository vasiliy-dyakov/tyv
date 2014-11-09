(function(app) {

    'use strict';

    app.controller('LangChoosingController', [
        '$scope',
        'i18n',
        function($scope, i18n) {
            $scope.lang = i18n.getLang();
            $scope.$watch(function() {
               if ($scope.lang !== i18n.getLang()) {
                    i18n.setLang($scope.lang);
                }
            });
        }
    ]);

})(TYV);
