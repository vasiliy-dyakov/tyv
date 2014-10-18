NPM_BIN = node_modules/.bin
LIBS = static/libs

.PHONY: all
all: $(NPM_BIN) $(LIBS)

$(NPM_BIN):
	@npm install

$(LIBS): $(NPM_BIN)
	@$(NPM_BIN)/bower install

.PHONY: server
server: $(NPM_BIN)
	@node tools/server.js

.PHONY: lint
lint: $(NPM_BIN)
	@$(NPM_BIN)/jshint-groups
	@$(NPM_BIN)/jscs .

.PHONY: test
	@$(NPM_BIN)/casperjs tests

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf static/libs
