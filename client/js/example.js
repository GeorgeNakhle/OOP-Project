console.log('Hello from example.js');

// Send the server a test event
socket.emit('test');

// Listen for server sending test event
socket.on('test', message => {
    alert('SocketIO works!')
})