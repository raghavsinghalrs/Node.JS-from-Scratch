const http = require('http');
const fs = require('fs');

// function request_listener(resolve,reject){

// }
const server = http.createServer((request,response)=>{
    const method = request.method;
    const url = request.url;
    if(url==='/'){
        fs.readFile('message.txt',{encoding:"utf-8"},(err,data)=>{
            response.write('<html>');
            response.write('<head><title>NodeJS</title></head>');
            response.write(`<body>${data}</body>`);
            response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            response.write('</html>')
            return response.end();
        })
    }
    if(url==='/message' && method=='POST'){
        const body = [];
        request.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        return request.on('end',()=>{
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split("=")[1]
            fs.writeFile('message.txt',message,err=>{
                response.statusCode = 302;
                response.setHeader('Location','/');
                return response.end();
            });
        })
    }

});

server.listen(3000);
