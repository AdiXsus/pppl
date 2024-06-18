var http = require('http');

http.createServer(function (req, res) {
  res.write("Hejka!!!");
  res.end();
}).listen(8080);
 
