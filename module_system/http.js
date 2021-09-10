
const http = require('http');


const server = http.createServer((req, res)=>{
       if(req.url === '/'){
        res.write('Hello friend ');
        res.write('How are you');
        res.end();
       }
       else if(req.url === '/home'){

        res.write('This is home page');
        res.end();
       }

       else{
        res.write('Not found');
        res.end();
       }

});


server.listen(3000);