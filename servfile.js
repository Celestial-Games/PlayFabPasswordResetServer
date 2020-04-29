var fs = require('fs');

exports.hostFile = function(file, contentType='text/html') {
    return function(q, res) {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            return res.end();
        });
    }
}

exports.hostImage = function(imageType ,file) {
    return function(q, res) {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, {'Content-Type': 'image/'+imageType});
            res.write(data);
            return res.end();
        });
    }
}
