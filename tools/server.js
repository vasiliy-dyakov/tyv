var connect = require('connect'),
    serveStatic = require('serve-static'),
    staticDir = __dirname.split('/').slice(0, -1).concat(['static']).join('/');

console.log('Created local server on: http://localhost:8080/');
console.log('Static directory: ', staticDir);

connect().use(serveStatic(staticDir)).listen(8080);
