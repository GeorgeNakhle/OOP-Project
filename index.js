const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Partial view renderer
const {registerPartialTemplate} = require('./mvc/controllers/HandlebarsHelper');

// Port for the back-end to listen on
const port = process.env.PORT || 8080;

// Create a request listener express app
const expressApp = express();
// Create an HTTP server using the request listener
const httpServer = http.createServer(expressApp);
// Attach socketio to the HTTP server
const io = socketio(httpServer);

// Start the HTTP server
httpServer.listen(port, '0.0.0.0', () => {
    console.log(`HTTP Server running on port ${port}! (http://127.0.0.1:${port})`);
});

// Start the socketio server
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


// Register Header and Footer partial views
registerPartialTemplate('Header', './mvc/views/partials/Header.hbs').then(() => {
    registerPartialTemplate('Footer', './mvc/views/partials/Footer.hbs').then(() => {
        // Add routes here
        expressApp.use('/example', require('./mvc/controllers/example.js'));
    })
})