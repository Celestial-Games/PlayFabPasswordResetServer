require('dotenv').config()

const http = require('http');
const url = require('url');
const servFile = require('./servfile');
const change = require('./change');
const qs = require('querystring');

const pageGroups={
    GET:{
        "/logo.png": servFile.hostImage("png", "./html/logo.png"),
        "/password.css": servFile.hostFile("./html/password.css"),
        "/": servFile.hostFile("./html/index.html"),
        "/index.html": servFile.hostFile("./html/index.html"),
        "/failure.html": servFile.hostFile("./html/failure.html"),
        "/success.html": servFile.hostFile("./html/success.html")
    },
    POST:{
        "/change.html": change.changePost("success.html","failure.html"),
    }
}

function processRequest(req,res,body=null){
    var pages=pageGroups[req.method]
    var request = url.parse(req.url, true);
    if (pages!=null){
        var page=pages[request.pathname]
        if (page != null) {
            page(request, res, body)
        } else {
            // 404
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end("<html><body><h1>Oh no, you have found a dead end.</h1><p>"+request.pathname+" can not be found for request type '"+req.method+"'</p></body></html>");
        }
    } else {
        // 404
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><body><h1>Oh no, you have found a dead end.</h1><p>"+request.pathname+" can not be found for request type '"+req.method+"'</p></body></html>");
    }
}

http.createServer(function (req, res) {
    if (req.method=="POST") {
        var body='';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6) { 
                req.connection.destroy();
            }
        });
        req.on('end', function () {
            processRequest(req,res,qs.parse(body))
        });
    } else {
        processRequest(req,res)
    }

}).listen(8080);
