require('dotenv').config()

const http = require('http');
const url = require('url');
const servFile = require('./servfile');
const change = require('./change');
const qs = require('querystring');

const pageGroups={
    GET:{
        "/apple-icon-57x57.png": servFile.hostImage("png", "./html/favicon/apple-icon-57x57.png"),
        "/apple-icon-60x60.png": servFile.hostImage("png", "./html/favicon/apple-icon-60x60.png"),
        "/apple-icon-72x72.png": servFile.hostImage("png", "./html/favicon/apple-icon-72x72.png"),
        "/apple-icon-76x76.png": servFile.hostImage("png", "./html/favicon/apple-icon-76x76.png"),
        "/apple-icon-114x114.png": servFile.hostImage("png", "./html/favicon/apple-icon-114x114.png"),
        "/apple-icon-120x120.png": servFile.hostImage("png", "./html/favicon/apple-icon-120x120.png"),
        "/apple-icon-144x144.png": servFile.hostImage("png", "./html/favicon/apple-icon-144x144.png"),
        "/apple-icon-152x152.png": servFile.hostImage("png", "./html/favicon/apple-icon-152x152.png"),
        "/apple-icon-180x180.png": servFile.hostImage("png", "./html/favicon/apple-icon-180x180.png"),
        "/android-icon-192x192.png": servFile.hostImage("png", "./html/favicon/android-icon-192x192.png"),
        "/favicon-32x32.png": servFile.hostImage("png", "./html/favicon/favicon-32x32.png"),
        "/favicon-96x96.png": servFile.hostImage("png", "./html/favicon/favicon-96x96.png"),
        "/favicon-16x16.png": servFile.hostImage("png", "./html/favicon/favicon-16x16.png"),
        "/manifest.json": servFile.hostFile("./html/favicon/manifest.json","text/json"),
        "/ms-icon-144x144.png": servFile.hostImage("png", "./html/favicon/ms-icon-144x144.png"),
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
