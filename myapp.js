const a = require('http')

const res = a.createServer((req,res)=>{

    const url = req.url;
    if (url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>')
        res.write('</html')
        res.end();
    }
    // console.log(req.headers);
    // res.write('<html>');
    // res.write('<head><title>First Doc</title></head>')
    // res.write('<body>Bhaijaan</body>')
    // res.write('</html')
    // res.end();
});

res.listen(3000);