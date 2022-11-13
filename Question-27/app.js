const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead('200', { 'Content-type': 'text/html' });
        fs.createReadStream('index_a.html').pipe(res);
    }

    else if (req.url === '/server' && req.method === 'POST') {
        var rawData = '';
        req.on('data', function (data) {
            rawData += data;
        })

        req.on('end', function () {
            res.writeHead('200', { 'Content-Type': 'text/html' }); 
            var inputData = new URLSearchParams(rawData); 
            res.write("You have Entered: " + '<br>');
            res.write("User Name: " + inputData.get('fname') + '<br>'); 
            res.write("Gender: " + inputData.get('gender') + '<br>')
            res.end(); 
        })
    }
});

server.listen(3000, function () {
   console.log("Server started at port 8080"); 
});