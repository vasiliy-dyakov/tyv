define(['StepsController', 'angular-mocks'], function() {
    describe('StepsController', function() {

        var scope,
            mockBackend;

        beforeEach(module('app'));

        beforeEach(inject(function($controller, $httpBackend) {

            scope = {};
            mockBackend = $httpBackend;

            mockBackend.expectGET('/data/ru/words1.json').respond({
                "words": [
                    {
                        "value": "отношение",
                        "phony": false
                    },
                    {
                        "value": "пистолет",
                        "phony": false
                    },
                    {
                        "value": "заглянуть",
                        "phony": false
                    },
                    {
                        "value": "сволочь",
                        "phony": false
                    }
                ],
                "dictionarySize": 48798,
                "stepSize": 10000
            });

            $controller('StepsController', { $scope: scope });

        }));

        it('should create "words" model with 4 words', function() {
            expect(scope.words).toBeUndefined();
            mockBackend.flush();
            expect(scope.words.length).toBe(4);
        });

    });
});
