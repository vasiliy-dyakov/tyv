({
    baseUrl: 'static/js',
    paths: {
        jquery: '../libs/jquery/dist/jquery',
        lodash: '../libs/lodash/dist/lodash',
        'twitter-bootstrap': '../libs/bootstrap/dist/js/bootstrap',
        angular: '../libs/angular/angular',
        requirejs: '../libs/requirejs/require',
        'angular-route': '../libs/angular-route/angular-route',
        'angular-cookies': '../libs/angular-cookies/angular-cookies'
    },
    include: 'requirejs',
    name: 'bootstrap',
    out: 'static/dist/bootstrap.js'
})
