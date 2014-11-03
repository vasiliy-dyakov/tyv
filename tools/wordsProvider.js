var fs = require('fs');

wordsProvider = {

    init: function() {

        this.setConstants();

        this.lemma = this.getDictionary();

        this.saveStep1();
        this.saveStep2();

    },

    setConstants: function() {

        this.ROOT_PATH = './';
        this.CVS_FILE = this.ROOT_PATH + 'data/lemma.num';
        this.JSON_FILE = this.ROOT_PATH + 'data/lemma.json';
        this.DATA_PATH = this.ROOT_PATH + 'static/data/';
        this.STEP1_JSON = this.DATA_PATH + 'words1.json';
        this.STEP2_JSON = this.DATA_PATH + 'words2.json';
        this.ENABLED_TYPES = ['noun', 'verb', 'adj', 'adv'];

    },

    getWords: function(numWordsInBundle, bundleSize, minBundle, maxBundle) {

        var words = [],
            bundleNum, // номер пачки начинается с нуля
            index,
            newWord;

        for (bundleNum = minBundle; bundleNum < maxBundle; bundleNum++) {

            while (words.length < (bundleNum - minBundle + 1) * numWordsInBundle) {

                index = this.random(bundleSize * bundleNum, bundleSize * (bundleNum + 1));
                newWord = this.lemma[index];

                if (words.indexOf(newWord) === -1  && this.ENABLED_TYPES.indexOf(newWord.type !== -1)) {
                    words.push(newWord.value);
                }

            }
        }

        return words;

    },

    saveStep1: function() {

        // из каждого десятка тысяч выбрать по 20 случайных слов
        var words = this.getWords(20, 10000, 0, 3);

        fs.writeFileSync(this.STEP1_JSON, JSON.stringify(words, null, 4));

    },

    saveStep2: function() {

        // сформировать для каждых 5 тысяч уточняющий набор из 60 случайных слов
        var words = {};

        for (var index = 0; index < 6; index++) {
            words[index * 5000] = this.getWords(60, 5000, index, index + 1);
        }

        fs.writeFileSync(this.STEP2_JSON, JSON.stringify(words, null, 4));

    },

    getDictionary: function() {
        return JSON.parse(fs.readFileSync(this.JSON_FILE));
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    convertCVS2JSON: function() {

        var cvs = fs.readFileSync(this.CVS_FILE, {
                encoding: 'utf-8'
            }).replace(/(\r\n|\r)/gm,'\n'),

            rows = cvs.split('\n'),
            json = {};

        rows.forEach(function(row, index) {
            if (!row) return;

            var array = row.split(' ');

            json[index] = {
                value: array[2],
                ipm: +array[1],
                type: array[3]
            };

        });

        fs.writeFileSync(this.JSON_FILE, JSON.stringify(json, null, 4));

    }

};

wordsProvider.init();
