if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUser(id) {
    window.location = `/add-user?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function sendMessage(chatname) {
    console.log(document.getElementById("inputText").value);
    console.log(chatname);
    console.log(socket.emit('message', { chatname: chatname, content: document.getElementById("inputText").value }));
    // Refresh page when message is sent
    socket.on("sent", () => {
        location.reload();
    })
}

// Scroll to bottom when chat window loads
document.addEventListener('DOMContentLoaded', function () {
    var div = document.getElementById("scroll");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}, false);