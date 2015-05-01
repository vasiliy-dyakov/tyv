describe('index page', function() {

    describe('steps of test', function() {
        beforeEach(function() {
            browser.get('/');
        });

        it('should something', function() {
            var wordsList = element.all(by.repeater('word in words'));
            expect(wordsList.count()).toBe(50);
        });
    });

});
