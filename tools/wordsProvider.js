var fs = require('fs'),
    prompt = require('sync-prompt').prompt,
    _ = require('lodash');

wordsProvider = {

    init: function() {
        this.setConstants();
    },

    generateWords: function() {

        this.lemma = this.getDictionary();
        this.phony = this.getPhony();

        this.saveStep1();
        this.saveStep2();

    },

    setConstants: function() {

        this.ROOT_PATH = './';
        this.CVS_FILE = this.ROOT_PATH + 'data/lemma.num';
        this.JSON_FILE = this.ROOT_PATH + 'data/lemma.json';
        this.CVS_FILE2 = this.ROOT_PATH + 'data/lemma2.num';
        this.JSON_FILE2 = this.ROOT_PATH + 'data/lemma2.json';
        this.JSON_PHONY = this.ROOT_PATH + 'data/phony.json';
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
        var words = this.getWords(1, 1000, 0, 48);

        words = this.mixPhony(words, 2)

        fs.writeFileSync(this.STEP1_JSON, JSON.stringify(words, null, 4));

    },

    saveStep2: function() {

        // сформировать для каждых 5 тысяч уточняющий набор из 40 случайных слов
        var words = {},
            step;

        for (var index = 0; index < 10; index++) {
            step = index * 5000;
            words[step] = this.getWords(48, 5000, index, index + 1);
            words[step] = this.mixPhony(words[step], 2);
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
        return JSON.parse(fs.readFileSync(this.JSON_FILE2));
    },

    getPhony: function() {
        return JSON.parse(fs.readFileSync(this.JSON_PHONY));
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    convertCVS2JSON: function() {

        var cvs = fs.readFileSync(this.CVS_FILE, {
                encoding: 'utf-8'
            }).replace(/(\r\n|\r)/gm,'\n'),

            rows = cvs.split('\n'),
            json = {},
            index = 0;

        rows.forEach(function(row) {

            var array = row.split(' ');

            if (!row || this.ENABLED_TYPES.indexOf(array[3]) === -1) return;

            json[index] = {
                value: array[2],
                ipm: +array[1],
                type: array[3]
            };

            index++;

        }.bind(this));

        fs.writeFileSync(this.JSON_FILE, JSON.stringify(json, null, 4));

    },

    convertCVS2JSON2: function() {

        var cvs = fs.readFileSync(this.CVS_FILE2, {
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

        fs.writeFileSync(this.JSON_FILE2, JSON.stringify(json, null, 4));

    }

};

var args = process.argv.slice(2)[0];

wordsProvider.init();
if (!args) {
    wordsProvider.generateWords();
} else {
    if (args == 1) {
        wordsProvider.convertCVS2JSON();
    } else if (args == 2) {
        wordsProvider.convertCVS2JSON2();
    } else {
        console.log('Задание не ясно! Ничего не сделано.');
    }
}
