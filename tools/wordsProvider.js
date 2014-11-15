var fs = require('fs'),
    prompt = require('sync-prompt').prompt,
    _ = require('lodash');

wordsProvider = {

    init: function() {
        this.setConstantsCommon();
    },

    generateWords: function(lang) {

        lang = lang || 'ru';

        if (lang === 'ru') {
            this.setConstantsRu();
        } else {
            this.setConstantsEn();
        }

        this.lemma = this.getDictionary();
        this.phony = this.getPhony();

        this.saveStep1();
        this.saveStep2();

    },

    setConstantsCommon: function() {
        this.ROOT_PATH = './';
        this.ENABLED_TYPES = ['noun', 'verb', 'adj', 'adv'];
    },

    setConstantsRu: function() {

        this.CVS_FILE = this.ROOT_PATH + 'data/lemma.num';
        this.JSON_FILE = this.ROOT_PATH + 'data/lemma.json';
        this.JSON_PHONY = this.ROOT_PATH + 'data/phony.json';
        this.DATA_PATH = this.ROOT_PATH + 'static/data/ru/';
        this.STEP1_JSON = this.DATA_PATH + 'words1.json';
        this.STEP2_JSON = this.DATA_PATH + 'words2.json';
        this.STEP1 = {
            numWordsInBundle: 1,
            bundleSize: 1000,
            minBundle: 0,
            maxBundle: 48,
            countPhony: 2
        };
        this.STEP2 = {
            minStep: 0,
            maxStep: 5,
            stepSize: 10000,
            stepCount: 48,
            countPhony: 2
        };

    },

    setConstantsEn: function() {

        this.CVS_FILE = this.ROOT_PATH + 'data/lemma_en.num';
        this.JSON_FILE = this.ROOT_PATH + 'data/lemma_en.json';
        this.JSON_PHONY = this.ROOT_PATH + 'data/phony_en.json';
        this.DATA_PATH = this.ROOT_PATH + 'static/data/en/';
        this.STEP1_JSON = this.DATA_PATH + 'words1.json';
        this.STEP2_JSON = this.DATA_PATH + 'words2.json';
        this.STEP1 = {
            numWordsInBundle: 2,
            bundleSize: 1000,
            minBundle: 0,
            maxBundle: 20,
            countPhony: 2
        };
        this.STEP2 = {
            minStep: 0,
            maxStep: 4,
            stepSize: 5000,
            stepCount: 40,
            countPhony: 2
        };

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

                if (newWord && words.indexOf(newWord) === -1  && this.ENABLED_TYPES.indexOf(newWord.type) !== -1
                        // && prompt(newWord.value + '[y/n]') === 'y'
                ) {
                    words.push(newWord.value);
                }

            }
        }

        return words;

    },

    saveStep1: function() {

        // из каждой тысячи выбрать по 1 случайному слову
        var words = this.getWords(
                this.STEP1.numWordsInBundle,
                this.STEP1.bundleSize,
                this.STEP1.minBundle,
                this.STEP1.maxBundle
            ),
            result;

        words = this.mixPhony(words, this.STEP1.countPhony);

        result = {
            words: words,
            dictionarySize: _.keys(this.lemma).length,
            stepSize: this.STEP2.stepSize
        };

        fs.writeFileSync(this.STEP1_JSON, JSON.stringify(result, null, 4));

    },

    saveStep2: function() {

        var words = {},
            step;

        for (var index = this.STEP2.minStep; index < this.STEP2.maxStep; index++) {
            step = index * this.STEP2.stepSize;
            words[step] = this.getWords(this.STEP2.stepCount, this.STEP2.stepSize, index, index + 1);
            words[step] = this.mixPhony(words[step], this.STEP2.countPhony);
        }

        fs.writeFileSync(this.STEP2_JSON, JSON.stringify(words, null, 4));

    },

    mixPhony: function(words, phonyCount) {

        var randomPosition,
            phonyLength = this.phony.length,
            randomPhony;

        words = words.map(function(word) {
            return {
                value: word,
                phony: false
            };
        });

        while (phonyCount) {

            randomPhony = this.phony[this.random(0, phonyLength - 1)];

            if (!_.where(words, { value: randomPhony }).length) {

                randomPosition = this.random(0, words.length - 1);
                words.splice(randomPosition, 0, {
                    value: randomPhony,
                    phony: true
                });
                phonyCount--;

            }

        }

        return words;

    },

    getDictionary: function() {
        return JSON.parse(fs.readFileSync(this.JSON_FILE));
    },

    getPhony: function() {
        return JSON.parse(fs.readFileSync(this.JSON_PHONY));
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    convertCvs2JsonRu: function() {

        this.setConstantsRu();

        var cvs = fs.readFileSync(this.CVS_FILE, {
                encoding: 'utf-8'
            }).replace(/(\r\n|\r)/gm,'\n'),

            rows = cvs.split('\n').slice(1),
            json = {},
            index = 0,
            types = {
                s: 'noun',
                a: 'adj',
                v: 'verb',
                adv: 'adv'
            };

        rows = _.sortBy(rows, function(row) {
            var splited = row.split('\t'),
                ipm = +splited[2],
                r = +splited[3]
            return (ipm > 10)
                ? -110 - ipm
                : -r - ipm;
        });

        rows.forEach(function(row) {

            var array = row.split('\t'),
                type = types[array[1]] || array[1];

            if (!row || this.ENABLED_TYPES.indexOf(type) === -1) return;

            json[index] = {
                value: array[0],
                ipm: +array[2],
                type: type,
                r: +array[3],
                d: +array[4],
                doc: +array[5]
            };

            index++;

        }.bind(this));

        fs.writeFileSync(this.JSON_FILE, JSON.stringify(json, null, 4));

    },

    convertCvs2JsonEn: function() {

        this.setConstantsEn();

        var cvs = fs.readFileSync(this.CVS_FILE, {
                encoding: 'utf-8'
            }).replace(/(\r\n|\r)/gm,'\n'),

            rows = cvs.split('\n').slice(1),
            json = {},
            index = 0,
            types = {
                n: 'noun',
                j: 'adj',
                v: 'verb',
                r: 'adv'
            };

        rows = _.sortBy(rows, function(row) {
            var splited = row.split('\t');
            return -splited[6];
        });

        rows.forEach(function(row) {

            var array = row.split('\t'),
                type = types[array[4]] || array[4];

            if (!row || this.ENABLED_TYPES.indexOf(type) === -1) return;

            json[index] = {
                value: array[3],
                ipm: +array[6].replace(/,/g, ''),
                type: type,
                r: 0,
                d: 0,
                doc: 0
            };

            index++;

        }.bind(this));

        fs.writeFileSync(this.JSON_FILE, JSON.stringify(json, null, 4));

    }

};

var args = process.argv.slice(2)[0];

wordsProvider.init();
if (!args) {
    wordsProvider.generateWords('ru');
} else {
    if (args == 'ru') {
        wordsProvider.generateWords('ru');
    } else if (args == 'en') {
        wordsProvider.generateWords('en');
    } else if (args == 'convert_ru') {
        wordsProvider.convertCvs2JsonRu();
    } else if (args == 'convert_en') {
        wordsProvider.convertCvs2JsonEn();
    } else {
        console.log('Задание не ясно! Ничего не сделано.');
    }
}
