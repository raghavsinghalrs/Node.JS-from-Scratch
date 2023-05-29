const a = require('http')
const fs = require('fs');
const { markAsUntransferable } = require('worker_threads');
const res = a.createServer((req,res)=>{

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
        req.on('end',()=>{
            const res = Buffer.concat(body).toString();
            const ans = res.split('=')[1];
            fs.writeFileSync('message.text',ans);
        })

        res.statusCode = 302;
        res.setHeader('Location','/')
        return res.end();
    }
    // console.log(req.headers);
    // res.write('<html>');
    // res.write('<head><title>First Doc</title></head>')
    // res.write('<body>Bhaijaan</body>')
    // res.write('</html')
    // res.end();
});

res.listen(3000);