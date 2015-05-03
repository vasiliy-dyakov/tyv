require.config({
    shim: {
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-mocks': ['angular'],
        'twitter-bootstrap': ['jquery'],
        'lodash': { exports: 'lodash' },
        'angular': { exports: 'angular' },
        'jquery': { exports: 'jQuery' }
    },
    baseUrl: '/base/static/js',
    paths: {
        jquery: '../libs/jquery/dist/jquery',
        lodash: '../libs/lodash/dist/lodash',
        'twitter-bootstrap': '../libs/bootstrap/dist/js/bootstrap',
        angular: '../libs/angular/angular',
        'angular-route': '../libs/angular-route/angular-route',
        'angular-cookies': '../libs/angular-cookies/angular-cookies',
        'angular-mocks': '../libs/angular-mocks/angular-mocks'
    }
});

require(
    Object.keys(window.__karma__.files)
        .filter(function(name) {
            return /(spec|test)\.js$/i.test(name);
        })
        .map(function(name) {
            return name.replace(/^\/base\//, '../../').replace(/\.js$/, '');
        }),
    window.__karma__.start
);
