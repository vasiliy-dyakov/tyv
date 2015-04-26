define(['app'], function(app) {

    'use strict';

    app.factory('storage', function() {

        var _storage = {};

        return {
                set: function(name, value) {
                    _storage[name] = value;
                },

                get: function(name) {
                    return _storage[name];
                },

                remove: function(name) {
                    delete _storage[name];
                },

                clean: function() {
                    _storage = {};
                }
            };

    });

});
