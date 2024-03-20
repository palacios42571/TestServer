const ws = new WebSocket('ws://127.0.0.1:8080');

console.log(JSON.stringify({
    x: 300,
    y: 100
}));

ws.onopen = function() {
    console.log('Connected to WebSocket server');

    ws.send("{ \"x\": 7027, \"y\": 3927}");
    /*
    ws.send(JSON.stringify({
        x: 300,
        y: 100
    }));
    */
};

ws.onmessage = function(event) {
    console.log('Received: ' + event.data);
};

ws.onclose = function() {
    console.log('Disconnected from WebSocket server');
};

function sendMessage(message) {
    ws.send(message);
}