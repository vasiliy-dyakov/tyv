describe('StepsController', function() {

    beforeEach(module('TYV'));

    it('should create "words" model with 20 words', inject(function($controller) {

        var scope = {};

        $controller('StepsController', { $scope: scope });

        expect(scope.words.length).toBe(20);

    }));

});
