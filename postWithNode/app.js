var http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res){
    if(req.url === '/'){
        res.writeHead(200,{"content-type" : "text/html"});
        fs.createReadStream('index.html').pipe(res);
    }
    else if(req.url === '/register' && req.method=="POST"){
        var rawData = '';
        req.on('data',function(data){
            rawData += data;
        });
        req.on('end', function(){
            inputData = new URLSearchParams(rawData);
            console.log(inputData);
            var name = inputData.get('name');
            var age = inputData.get('age');
            var phone = inputData.get('phone');
            res.writeHead(200,{"content-type" : "text/html"});
            res.write("<style>table,th,td{padding: 20px;border: 1px solid black;border-collapse: collapse;}</style><center><h1>User Submitted details  </h1></center> <br><br>");
            res.write("<center><table><tbody><tr><td>Name </td><td>"+name+"</td></tr><tr><td>Age </td><td>"+age+"</td></tr><tr><td>Phone no </td><td>"+phone+"</td></tr></tbody></table></center>");
            res.end();
        });
    }
});

server.listen(8080);