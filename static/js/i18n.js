TYV.factory('i18n', ['$cookies', function($cookies) {

    var _translations = {},
        _currentLang,
        _callbacks = {},

        i18n = {

            init: function() {

                var lang,
                    langs = ['ru', 'en'];

                langs.forEach(function(lang) {
                    _translations[lang] = {};
                });

                cookieLang = $cookies.lang;
                lang = cookieLang
                    ? cookieLang
                    : this._detectLang();

                _currentLang = langs.indexOf(lang) !== -1
                    ? lang
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
                this.saveLang(lang);
                this.trigger('lang:changed');
            },

            getLang: function() {
                return _currentLang;
            },

            saveLang: function(lang) {
                $cookies.lang = lang;
            },

            _detectLang: function() {
                var detected = ((navigator.language || navigator.userLanguage) ||
                        navigator.languages && navigator.languages[0]);

                return detected && detected.split('-')[0];
            }

        };

    i18n.init();

    return i18n;

}]);
