TYV.factory('i18n', function() {

    var _translations = {},
        langs = ['ru', 'en'],
        detectedLang = detectLang(),
        currentLang = langs.indexOf(detectedLang) !== -1
            ? detectedLang
            : 'en';

    langs.forEach(function(lang) {
        _translations[lang] = {};
    });

    i18n = function(key) {
        return _translations[currentLang][key] || key;
    };

    i18n.add = function(translations) {
        _.forOwn(translations, function(values, lang) {
            _.forOwn(values, function(value, key) {
                _translations[lang][key] = value;
            });
        });
    };

    i18n.setLang = function(lang) {
        currentLang = lang;
    };

    i18n.saveLang = function(lang) {
        
    };

    i18n.getLang = function() {
        return currentLang;
    };

    return i18n;

    function detectLang() {
        var detected = ((navigator.language || navigator.userLanguage) ||
                navigator.languages && navigator.languages[0]);

        return detected && detected.split('-')[0];
    }

});
