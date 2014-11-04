(function(app) {

    'use strict';

    app.controller('ResultController', [
        '$scope',
        '$routeParams',
        'storage',
        function($scope, $routeParams, storage) {
            $scope.knownWords = storage.get('knownWords');
        }
    ]);

})(TYV);
