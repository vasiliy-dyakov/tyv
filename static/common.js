require.config({
    shim: {
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'twitter-bootstrap': ['jquery']
    },
    baseUrl: 'js',
    paths: {
        jquery: '../libs/jquery/dist/jquery',
        lodash: '../libs/lodash/dist/lodash',
        'twitter-bootstrap': '../libs/bootstrap/dist/js/bootstrap',
        angular: '../libs/angular/angular',
        'angular-route': '../libs/angular-route/angular-route',
        'angular-cookies': '../libs/angular-cookies/angular-cookies'
    }
});

require([
    'angular',
    'angular-route',
    'angular-cookies',
    'jquery',
    'lodash',
    'twitter-bootstrap',
    'app',
    'storage',
    'i18n',
    'GlobalController',
    'LangChoosingController',
    'ResultController',
    'StepsController'
], function() {
    angular.bootstrap(document, ['app']);
});
