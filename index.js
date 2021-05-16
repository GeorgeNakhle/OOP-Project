const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');

// Get the project root path
const projectRoot = path.dirname(require.main.filename);

// Save MVC paths in env
process.env.models = path.resolve(projectRoot, 'mvc', 'models');
process.env.views = path.resolve(projectRoot, 'mvc', 'views');
process.env.controllers = path.resolve(projectRoot, 'mvc', 'controllers');

// Save other front-end stuff in env
process.env.styles = path.resolve(projectRoot, 'css');
process.env.scripts = path.resolve(projectRoot, 'js');
process.env.images = path.resolve(projectRoot, 'img');
// Save API path in env
process.env.api = path.resolve(projectRoot, 'api');
// Database connection stuff
process.env.database_host = 'net.tonyvas.top';
process.env.database_port = 6969;
process.env.database_user = 'chats_user';
process.env.database_password = 'Potato123';
// Database path
process.env.database = path.resolve(projectRoot, 'database');
// SocketIO path
process.env.socketio = path.resolve(projectRoot, 'socketio');

// Partial view renderer
const { registerPartialTemplate } = require(`${process.env.controllers}/HandlebarsHelper`);

// Port for the back-end to listen on
const port = process.env.PORT || 8080;
// Partials for views
const PARTIALS = ['Header', 'Scripts', 'Styles'];

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

// Pass the socketIO instance to the controller
require(`${process.env.socketio}/controller.js`)(io);

const promises = [];
for (const partial of PARTIALS) {
    const promise = registerPartialTemplate(partial, `${process.env.views}/partials/${partial}.hbs`);
    promises.push(promise);
}

Promise.all(promises).then(() => {
    expressApp.all('*', (req, res, next) => {
        console.log(`Request for ${req.url}`);
        next();
    })

    // POST body parser
    expressApp.use(bodyParser.json());

    // Get handlers for CSS Style
    expressApp.get('/css/:filename', (req, res) => {
        res.sendFile(`${process.env.styles}/${req.params.filename}`);
    });
    // Get handlers for JS Scripts
    expressApp.get('/js/:filename', (req, res) => {
        res.sendFile(`${process.env.scripts}/${req.params.filename}`);
    });
    // Get handlers for images
    expressApp.get('/img/:filename', (req, res) => {
        res.sendFile(`${process.env.images}/${req.params.filename}`);
    });

    // favicon
    expressApp.get('/favicon.ico', (req, res) => {
        res.sendFile(`${process.env.images}/favicon.ico`);
    });

    // Get handler for API documentation
    expressApp.get('/api', (request, response) => {
        response.sendFile(`${process.env.api}/index.html`);
    })
    // Post handlers for API
    expressApp.use('/api', require(`${process.env.api}/controller.js`))

    // / and /home are the same
    expressApp.use('/', require(`${process.env.controllers}/Home.js`));
    expressApp.use('/home', require(`${process.env.controllers}/Home.js`));

    expressApp.use('/login', require(`${process.env.controllers}/Login.js`));
    expressApp.use('/register', require(`${process.env.controllers}/Register.js`));

    expressApp.use('/chat', require(`${process.env.controllers}/Chat.js`));
    expressApp.use('/chat-list', require(`${process.env.controllers}/ChatList.js`));
    expressApp.use('/create-chat', require(`${process.env.controllers}/CreateChat.js`));
    expressApp.use('/search-chat', require(`${process.env.controllers}/SearchChat.js`));

    expressApp.use('/add-contact', require(`${process.env.controllers}/AddContact.js`));
    expressApp.use('/contact-list', require(`${process.env.controllers}/ContactList.js`));
    expressApp.use('/contact-info', require(`${process.env.controllers}/ContactInfo.js`));

    expressApp.use('/add-user', require(`${process.env.controllers}/AddUser.js`));
});