require.config({
    shim: {
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-mocks': ['angular'],
        bootstrap: ['jquery'],
        lodash: { exports: 'lodash' },
        angular: { exports: 'angular' },
        jquery: { exports: 'jQuery' }
    },
    baseUrl: 'js',
    paths: {
        jquery: '../libs/jquery/dist/jquery',
        lodash: '../libs/lodash/dist/lodash',
        bootstrap: '../libs/bootstrap/dist/js/bootstrap',
        angular: '../libs/angular/angular',
        'angular-route': '../libs/angular-route/angular-route',
        'angular-cookies': '../libs/angular-cookies/angular-cookies',
        'angular-mocks': '../libs/angular-mocks/angular-mocks'
    }
});

if (typeof __karma__ === 'undefined') {
    require([
        'angular',
        'bootstrap',
        'app',
        'storage',
        'i18n',
        'GlobalController',
        'LangChoosingController',
        'ResultController',
        'StepsController'
    ], function(angular) {
        angular.bootstrap(document, ['app']);
    });
}
