var fs = require('fs');

exports.hostFile = function(file) {
    return function(q, res) {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
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
