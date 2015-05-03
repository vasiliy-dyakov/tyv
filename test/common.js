require.config({
    baseUrl: '/base/static/js',
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
