var http = require('http');
var fs = require('fs')
var qs = require('querystring');
var url = require("url");
const { parse } = require('path');
var userspath = __dirname + "/users/"
var server = http.createServer(handlerequest);
function handlerequest(req,res){
  var parsedUrl = url.parse(req.url , true);
  var store = "";
  req.on('data',(chunk)=>{
      store += chunk
  });

  req.on('end',()=>{
      if(req.method ==="POST" && req.url ==="/users"){
          var username = JSON.parse(store).username;
          fs.open(userspath + username + ".json" , "wx" ,(err ,fd) =>{
              if(err)return console.log(err);
              fs.writeFile(fd,store ,(err)=>{
                  if(err)return console.log(err);
                  fs.close(fd ,()=>{
                      res.end(`${username} created successfully`)
                  })
              })
          })
      }
      if(req.method === "GET" && parsedUrl.pathname ==="/users"){
          var username = parsedUrl.query.username;
fs.readFile(userspath + username + ".json" ,(err ,content)=>{
  console.log( err ,content);
  if(err) console.log(err);
  res.setHeader('content-type' ,'application/json')
 return res.end(content)
})
      }
      if(parsedUrl.pathname === '/users' && req.method === "PUT"){
          var username =parsedUrl.query.username;
          fs.open(userspath+ username + ".json" ,"r+", (err ,fd)=>{
              if(err)return console.log(err);
              fs.truncate(fd,(err)=>{
                if(err)return console.log(err);
                fs.writeFile(fd ,store ,(err)=>{
                    if(err) return console.log(err);
                    fs.close(fd,()=>{
                     return   res.end(`${username} updated Successfully`);
                    })
                })
              })
          })
      }
      if(parsedUrl.pathname === "./users" && req.method === "DELETE"){
          var username =parsedUrl.query.username;
          fs.unlink(userspath +username + ".json", (err)=>{
              if(err) return console.log(err);
           return   res.end(`${username} is deleted`);
          })
      }
      res.statusCode =  404;
      res.end(`page is not found`)

  })
  
}


server.listen(3000,()=>{
  console.log("sever listner in port 3000");
})