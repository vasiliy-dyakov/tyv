module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        'test/common.js',
        { included: false, pattern: 'test/unit/**/*.js' },
        { included: false, pattern: 'static/**/*.js' }
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'requirejs'],

    browsers : ['Chrome'],

    plugins : [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-requirejs'
    ],

    junitReporter : {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
    },

    singleRun: false

  });
};
