const { Socket } = require("socket.io");

const socketio = require('socket.io');

if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUser(id) {
    window.location = `/add-to-chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function sendMessage(chatname) {
    alert(document.getElementById("inputText").value);
    alert(chatname);
    socketio.emit('message', { chatname: chatname, content: document.getElementById("inputText").value })
}