const a = require('http')
const fs = require('fs');
const server = a.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    if (url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>')
        res.write('</html')
        return res.end();
    }
    if (url==='/message' && method==='POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            const x = Buffer.concat(body).toString();
            const ans = x.split('=')[1];
            fs.writeFile('message.text',ans, err =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        })

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First Doc</title></head>')
    res.write('<body>Bhaijaan</body>')
    res.write('</html')
    res.end();
});

server.listen(3000);