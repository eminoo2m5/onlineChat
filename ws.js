let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  console.log('opened');

  ws.on('message', function (message) {
    console.log('received: %s', message)
  });

  ws.on('close', function () {
    console.log('closed');
  });

  setInterval( () => {
      try {
        ws.send(`${new Date()}`);
      } catch (e) {};
    },
    1000
  );
})
