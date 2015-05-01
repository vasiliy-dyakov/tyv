describe('StepsController', function() {

    it('should create "words" model with 50 words', inject(function($controller) {

        var scope = {};

        $controller('StepsController', { $scope: scope });

        expect(scope.words.length).toBe(50);

    }));

});
