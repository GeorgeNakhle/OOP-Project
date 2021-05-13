const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

// Get the project root path
const projectRoot = path.dirname(require.main.filename);
// Save MVC paths in env
process.env.models = path.resolve(projectRoot, 'mvc', 'models');
process.env.views = path.resolve(projectRoot, 'mvc', 'views');
process.env.controllers = path.resolve(projectRoot, 'mvc', 'controllers');
// Save other shit in env
process.env.styles = path.resolve(projectRoot, 'css');
process.env.scripts = path.resolve(projectRoot, 'js');

// Partial view renderer
const {registerPartialTemplate} = require(`${process.env.controllers}/HandlebarsHelper`);

// Port for the back-end to listen on
const port = process.env.PORT || 8080;
// Partials for views
const PARTIALS = [ 'Header', 'Footer', 'Scripts', 'Styles' ];

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

const promises = [];
for (const partial of PARTIALS){
    const promise = registerPartialTemplate(partial, `${process.env.views}/partials/${partial}.hbs`);
    promises.push(promise);
}

Promise.all(promises).then(() => {
    // Get handlers for CSS Style
    expressApp.get('/css/:filename', (req, res) => {
        res.sendFile(`${process.env.styles}/${req.params.filename}`);
    });
    // Get handlers for JS Scripts
    expressApp.get('/js/:filename', (req, res) => {
        res.sendFile(`${process.env.scripts}/${req.params.filename}`);
    });

    // Add routes here
    expressApp.use('/example', require(`${process.env.controllers}/example.js`));
});