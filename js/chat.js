if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUser(id) {
    window.location = `/add-user?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function sendMessage(chatname) {
    let inputText = document.getElementById("inputText").value;
    if (inputText == "" || inputText == null) {
        alert("ERROR: Can't send empty text message.");
    } else {
        console.log(`SENDING "${document.getElementById("inputText").value}" TO CHAT: ${chatname}`);
        console.log(socket.emit('message', { chatname: chatname, content: document.getElementById("inputText").value }));
        // Refresh page when message is sent
        socket.on("sent", () => {
            location.reload();
        })
    }
}

// Scroll to bottom when chat window loads
document.addEventListener('DOMContentLoaded', function () {
    var div = document.getElementById("scroll");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}, false);