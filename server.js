var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3000;
var ROOT = __dirname;

var mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf'
};

http.createServer(function (req, res) {
    var url = req.url.split('?')[0];
    var filePath = path.join(ROOT, url === '/' ? 'index.html' : url);

    fs.stat(filePath, function (err, stats) {
        if (!err && stats.isFile()) {
            var ext = path.extname(filePath);
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            fs.createReadStream(filePath).pipe(res);
        } else {
            // SPA fallback — serve index.html for unknown routes
            var indexPath = path.join(ROOT, 'index.html');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(indexPath).pipe(res);
        }
    });
}).listen(PORT, function () {
    console.log('Dev server running at http://localhost:' + PORT);
});
