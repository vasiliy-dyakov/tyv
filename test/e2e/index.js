describe('index page', function() {

    describe('steps of test', function() {
        beforeEach(function() {
            browser.get('/');
        });

        it('should something', function() {
            var wordsList = element.all(by.repeater('word in words'));
            var query = element(by.model('query'));

            expect(wordsList.count()).toBe(20);

            query.sendKeys('ка');
            expect(wordsList.count()).toBe(4);

            query.clear();
            expect(wordsList.count()).toBe(20);
        });
    });

});
