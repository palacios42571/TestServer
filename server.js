const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
let remainingRecipes = [
    243140, 243154, 243163, 245701, 243456, 243254, 243478, 244519, 244539
];

let connectedRecipes = [];

const clients = {};
const datas = {};

function sendToAll()
{
    for (let clientId in clients) {
        clients[clientId].socket.send(JSON.stringify({
            id: clientId,
            all: datas
        }));
    }
}

wss.on('connection', (ws) => {
   // console.log('new connected');

    const index = getRandomInt(0, remainingRecipes.length - 1);
    const clientId = remainingRecipes[index];

    remainingRecipes.splice(index, 1);
    connectedRecipes.push(clientId);

    clients[clientId] = {
        socket: ws,
    };

    datas[clientId] = {
        data: {},
        position: {
            x: getRandomInt(7000, 11000),
            y: getRandomInt(2000, 4000)
        }
    };
    
 //   sendToAll();
    
    ws.on('message', (message) => {
        // console.log(message);
        
        const jsonData = JSON.parse(message);

        datas[clientId].position = jsonData;

   //     sendToAll();
    });

    ws.on('close', () => {
        const indexToRemove = connectedRecipes.indexOf(clientId);
        connectedRecipes.splice(indexToRemove, 1);
        remainingRecipes.push(clientId);

        delete clients[clientId];
        delete datas[clientId];

   //     sendToAll();
    });
});

setInterval(() => {
    sendToAll()
}, 1000.0 / 60.0);