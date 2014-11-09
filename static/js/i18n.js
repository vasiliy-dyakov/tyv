TYV.factory('i18n', function() {

    var _translations = {},
        _currentLang,
        _callbacks = {},

        i18n = {

            init: function() {

                var detectedLang = this._detectLang(),
                    langs = ['ru', 'en'];

                langs.forEach(function(lang) {
                    _translations[lang] = {};
                });

                _currentLang = langs.indexOf(detectedLang) !== -1
                    ? detectedLang
                    : 'en';

            },

            add: function(translations) {
                _.forOwn(translations, function(values, lang) {
                    _.forOwn(values, function(value, key) {
                        _translations.ru[key] || (_translations.ru[key] = key);
                        _translations[lang][key] = value;
                    });
                });
            },

            getCurrentTranslations: function() {
                return _translations[_currentLang];
            },

            bind: function(event, callback) {
                _callbacks[event] || (_callbacks[event] = []);
                _callbacks[event].push(callback);
            },

            unbind: function(event, callback) {
                if (typeof callback === 'undefined') {
                    delete _callbacks[event]
                } else {
                    _callbacks[event] = _.find(_callbacks[event],function(fn) {
                        return fn !== callback ? fn : null;
                    });
                }
            },

            trigger: function(event) {
                _callbacks[event] && _callbacks[event].forEach(function(callback) {
                    callback(event);
                });
            },

            setLang: function(lang) {
                _currentLang = lang;
                this.trigger('lang:changed');
            },

            getLang: function() {
                return _currentLang;
            },

            saveLang: function(lang) {
                // @TODO: Сохранять в куки
            },

            _detectLang: function() {
                var detected = ((navigator.language || navigator.userLanguage) ||
                        navigator.languages && navigator.languages[0]);

                return detected && detected.split('-')[0];
            }

        };

    i18n.init();

    return i18n;

});
