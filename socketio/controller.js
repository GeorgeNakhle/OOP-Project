const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);
const getChatList = require(`${process.env.api}/getChatList`).model;

function start(io) {
    const sockets = [];

    // Start the socketio server
    // Listen for client connections
    io.on('connection', socket => {
        sockets.push(socket);
        console.log(`Socket connected! (${sockets.length})`);

        // Listen for client disconnection
        socket.on('disconnect', () => {
            const i = sockets.indexOf(socket);
            if (i >= 0) {
                sockets.splice(i, 1);
                console.log(`Socket disconnected! (${sockets.length})`);
            }
        })

        socket.on('hello', data => {
            console.log('hello from', data);
            socket.userID = data.userID;
            socket.username = data.username;
        })

        socket.on('message', data => {
            if (!socket.userID || !socket.username) {
                return socket.emit('error', new Error('You did not say hello yet!'));
            }

            const { chatname, content } = data;
            const currentUserID = socket.userID;
            const username = socket.username;

            helper.checkIfChatnameExists(chatname).then(exists => {
                if (exists) {
                    helper.chatnameToChatID(chatname).then(chatID => {
                        const sentOn = new Date().valueOf();
                        db.insert('message', { user_id: currentUserID, chat_id: chatID, content, sent_on: sentOn }).then(insert => {
                            sendMessageToSockets(sockets, socket, chatID, content, sentOn);
                        }).catch(err => {
                            console.error(err);
                            socket.emit('error', err);
                        })
                    }).catch(err => {
                        console.error(err);
                        socket.emit('error', err);
                    });
                }
                else {
                    socket.emit('error', new Error('Chat does not exist!'));
                }
            })
        });
    });
}

function sendMessageToSockets(sockets, sendingSocket, chatID, content, sentOn) {
    for (const socket of sockets) {
        if (socket == sendingSocket) continue;
        if (!socket.userID) continue;

        getChatList(socket.userID).then(res => {
            if (res.success) {
                for (const chat of res.chats) {
                    if (chat.chat_id == chatID) {
                        socket.emit('message', { username: sendingSocket.username, chatID, content, sentOn });
                        return;
                    }
                }
            }
            else {
                console.error(res);
            }
        }).catch(err => {
            console.error(err);
        })
    }
    sendingSocket.emit("sent");
}

module.exports = start;