const a = require('http')

const res = a.createServer((req,res)=>{
    console.log(req.headers);
    res.write('<html>');
    res.write('<head><title>First Doc</title></head>')
    res.write('<body>Bhaijaan</body>')
    res.write('</html')
    res.end();
});

res.listen(3000);