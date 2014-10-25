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

.PHONY: test
test: test-client test-e2e

.PHONY: test-client
test-client: $(NPM_ROOT)
	@$(NPM_ROOT)/karma/bin/karma start test/karma.conf.js

.PHONY: test-e2e
WEB_DRIVER = $(NPM_ROOT)/protractor/selenium
test-e2e: $(WEB_DRIVER)
	@$(NPM_BIN)/protractor test/protractor.conf.js

$(WEB_DRIVER): $(NPM_ROOT)
	$(NPM_BIN)/webdriver-manager update

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf static/libs
