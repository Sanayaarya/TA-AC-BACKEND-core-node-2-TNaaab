 console.log(indexpath);

var http = require('http')
var qs = require('querystring')
var server = http.createServer(handleSever)
function handleSever(req,res){
  if (req.method === 'POST' && req.url === '/'){
    var store = ''
    req.on('data' , (chunk)=>{
      store += chunk;
    }).on('end',()=>{
      res.statusCode = 201;
      var parsedData = qs.parse(store)
       res.end(JSON.stringify(parsedData));
    })
  }
}


server.listen(3000,()=>{
    console.log('server listner port 3000');
})


