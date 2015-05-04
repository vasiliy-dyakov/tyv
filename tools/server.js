var connect = require('connect'),
    serveStatic = require('serve-static'),
    staticDir = __dirname.split('/').slice(0, -1).concat(['static']).join('/');

console.log('http://localhost:8080/');

connect().use(serveStatic(staticDir)).listen(8080);
