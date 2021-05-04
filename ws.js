let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 40510})
const WebSocket = require('ws');

wss.on('connection', function (ws) {
  console.log('A client has connected.');
  ws.on('message', function (message) {
    message = JSON.parse(message);
    console.log('received: %s from: %s', message.body, message.name)
    if (message.body === 'EXIT') {
      ws.close();
    } else {
      message = JSON.stringify(message)
      wss.clients.forEach(function each(client){
        if(client != ws && client.readyState == WebSocket.OPEN){
          client.send(message);
        }
      })
    }
  });

  ws.on('close', function () {
    console.log('A client has closed');
  });

  setInterval( () => {
      try {
        //ws.send(`${new Date()}`);
      } catch (e) {};
    },
    1000
  );
})
