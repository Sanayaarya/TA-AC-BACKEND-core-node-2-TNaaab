
var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleSever);
function handleSever(req, res) {
  // var dataFormat = req.headers['content-type'];
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && req.url ==='/json') {
      console.log(store);
      res.setHeader('content-type' , "application/json")
      res.end(store);
    }
    if (req.method === 'post' && req.url === '/form') {
      console.log(store);
     var formData = qs.parse(store)
     res.end(JSON.stringify(formData))
    }
  });
}

server.listen(7000, () => {
  console.log('server listener on port 7000');
});