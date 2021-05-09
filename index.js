const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {
    registerPartialTemplate,
     renderTemplate
    } = require('./mvc/controllers/HandlebarsHelper');
// Root directory for client files
const CLIENT_PATH = './client';

// Port for the back-end to listen on
const port = process.env.PORT || 8080;

// Create a request listener express app
const expressApp = express();
// Create an HTTP server using the request listener
const httpServer = http.createServer(expressApp);
// Attach socketio to the HTTP server
const io = socketio(httpServer);

// Set the request listener to use the client path
//expressApp.use(express.static(CLIENT_PATH));

// Start the HTTP server
httpServer.listen(port, '0.0.0.0', () => {
    console.log(`HTTP Server running on port ${port}! (http://127.0.0.1:${port})`);
});

// Start the socketio server
// Add the following tag to every HTML page "<script src="/socket.io/socket.io.js"></script>"

// Listen for client connections
io.on('connection', socket => {
    console.log('Socket connected!');

    // Listen for client disconnection
    socket.on('disconnect', () => {
        console.log('Socket disconnected!');
    })

    // When a client sends a test event, reply with a test event
    socket.on('test', () => {
        socket.emit('test');
    })
});


registerPartialTemplate('Header', './mvc/views/partials/Header.hbs').then(() => {
    registerPartialTemplate('Footer', './mvc/views/partials/Footer.hbs').then(() => {
        expressApp.use('/example', require('./mvc/controllers/example.js'));
    })
})