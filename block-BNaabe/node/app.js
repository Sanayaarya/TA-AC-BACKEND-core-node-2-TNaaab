var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req,res){
  var store = ''
  console.log(`req.headers['Content-Type']` )
  req.on('data',(chunk)=>{
    store += chunk;
  })
  req.on('end',()=>{
   if(req.header['content-type']==='application/x-www-form-url-urlencoded'){
   var formData = qs.parse(store);
   res.setHeader('content-type',text/html);
   res.end(`<h2>${formnData.name}</h2><p>${fprmData.email }</p>`)
   }
    if(req.header['content-type']==='application/json'){
     var jsonData = JSON.parse(store);
     res.setHeader('Content-type', 'text/html');
     res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email }</p>`)
    }
  })
}

server.listen(4000,()=>{
  console.log('server running on port 4k') 
})