var http = require('http');
var dt = require('./myFirstModule');
var fs = require('fs');
var express = require('express');
var myParser = require('body-parser');
const multiparty = require('multiparty');


var app = express();

app.use(myParser.urlencoded({ extended: true }));

app.post("/", function(request, response) {
    console.log("in post");
    console.log(request.body);

    const form = new multiparty.Form();
    form.parse(request, (err, fields, files) => {
        if (err) {
            throw err;
        }
        response.writeHead(200, { 'content-type': 'application/gzip' });
        response.end();
    });
});

app.get("/", function(request, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('UploadFIle.html').pipe(res);
});


// http.createServer(function(req, res) {
//     console.log(req.method)
//     console.log("create Server.........................");
//  res.end('Hello NODE!' + dt.myDateTime());
// res.writeHead(200, { 'Content-Type': 'text/html' })
// if (req.method === 'GET') {
//     fs.createReadStream('UploadFIle.html').pipe(res);
// }
// if (req.method === 'POST') {
//     res.end("FILE UPLOADED ...............");
// }
//}).listen(8080);

app.listen(8080);