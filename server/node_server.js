const http = require('http');
const url = require("url");
const querystring = require('querystring');
const playground = require('fdw_playground');

const server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  console.log(page);
  var params = querystring.parse(url.parse(req.url).query);
  console.log(params);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
  playground.evtEmitter.emit("requestHandled", {"page": page, "params": params});
});

server.on('close', function() {
  console.log("server is closing");
})

server.listen(8080);