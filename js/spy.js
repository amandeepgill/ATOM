"use strict";
// Port where we'll run the websocket server
var webSocketsServerPort = 8080;
var webSocketServer = require('websocket').server;
var http = require('http');
var mssg;
var clients = [ ];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ');
    response.writeHead(404);
    response.end();
});

server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "+ webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request.
  httpServer: server,autoAcceptConnections: false
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
 // if (request.origin==='http://eis.ba.ssa.gov'){
      var connection = request.accept('echo-protocol', request.origin);
      var index = clients.push(connection) - 1;
      console.log((new Date()) + ' Connection accepted.');

      // user sent some message
      connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
              console.log((new Date()) + ' Received Message from ' + ': ' + message.utf8Data);
            var obj = {

              text: htmlEntities(message.utf8Data),
            };
            // broadcast message to all connected clients
            var json = JSON.stringify({ type:'message', data: obj });
            for (var i=0; i < clients.length; i++) {
              clients[i].sendUTF(json);
            }
        // }
        }
      });

      // user disconnected
      connection.on('close', function(connection) {
      // if (userName !== false && userColor !== false) {
        // remove connected clients
          clients.splice(index, 1);
          console.log((new Date()) + " Peer "+ connection.remoteAddress + " disconnected.");
      // }
      });

//  }//if (request.origin==='http://eis.ba.ssa.gov'){

});


function startSpy(){
  const {Builder, By, Key, until} = require('selenium-webdriver');
  let driver=new Builder()
  .forBrowser('chrome')
  .build();
  var browser=driver.get('http:/google.com');
  //var browser=driver.get('https://secure.ssa.gov/acu/ACU_KBA/main.jsp?URL=/apps8z/ARPI/main.jsp?locale=en&LVL=4');
  


};
