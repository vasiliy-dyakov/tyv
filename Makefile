NPM_ROOT = node_modules
NPM_BIN = $(NPM_ROOT)/.bin
LIBS = static/libs

.PHONY: all
all: $(NPM_ROOT) $(LIBS)

$(NPM_ROOT):
	@npm install

$(LIBS): $(NPM_ROOT)
	@$(NPM_BIN)/bower install

.PHONY: server
server: $(NPM_ROOT)
	@node tools/server.js

.PHONY: lint
lint: $(NPM_ROOT)
	@$(NPM_BIN)/jshint-groups
	@$(NPM_BIN)/jscs .

KARMA_START = $(NPM_ROOT)/karma/bin/karma start test/karma.conf.js
.PHONY: test-unit
test-unit: $(NPM_ROOT)
	@$(KARMA_START)

.PHONY: test-unit-single
test-unit-single: $(NPM_ROOT)
	$(KARMA_START) --single-run=true

.PHONY: test-e2e
WEB_DRIVER = $(NPM_ROOT)/protractor/selenium
test-e2e: $(WEB_DRIVER)
	$(NPM_BIN)/protractor test/protractor.conf.js

.PHONY: test
test: test-unit-single test-e2e

$(WEB_DRIVER): $(NPM_ROOT)
	$(NPM_BIN)/webdriver-manager update

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf static/libs

.PHONY: words
words: $(NPM_ROOT)
	node tools/wordsProvider.js ru
	node tools/wordsProvider.js en

.PHONY: dist
dist: $(NPM_ROOT) $(LIBS)
	node $(NPM_ROOT)/requirejs/bin/r.js -o build.js
	node $(NPM_ROOT)/requirejs/bin/r.js -o cssIn=static/common.css out=static/dist/common.css
