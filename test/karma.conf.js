module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'static/libs/angular/angular.js',
      'static/libs/angular-route/angular-route.js',
      'static/libs/angular-mocks/angular-mocks.js',
      'static/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
