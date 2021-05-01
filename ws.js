let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 40510})
const WebSocket = require('ws');

wss.on('connection', function (ws) {
  console.log('opened');

  ws.on('message', function (message) {
    console.log('received: %s', message)
    if (message === 'exit') {
      ws.close();
    } else {
      wss.clients.forEach(function each(client){
        if(client != ws && client.readyState == WebSocket.OPEN){
          client.send(message);
        }
      })
    }
  });

  ws.on('close', function () {
    console.log('closed');
  });

  setInterval( () => {
      try {
        //ws.send(`${new Date()}`);
      } catch (e) {};
    },
    1000
  );
})
