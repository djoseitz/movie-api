const http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer((request, response) => {
    let addr = request.url,
        q = url.parse(addr, true),
        filePath = '';
    if (q.pathname.includes('documentation')) {
        filePath = (_dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    /* NOTE: NOT SURE ABOUT THIS YET, NEEDS TO BE REWORKED */
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added to log.');
        }
      });
}).listen(8080);



console.log('My test server is running on Port 8080.');