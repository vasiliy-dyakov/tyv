module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        'static/common.js',
        'test/common.js',
        { included: false, pattern: 'test/unit/**/*.js' },
        { included: false, pattern: 'static/js/**/*.js' },
        { included: false, pattern: 'static/libs/**/*.js' }
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
