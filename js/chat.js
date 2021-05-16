if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUser(id) {
    window.location = `/add-to-chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function sendMessage(chatname) {
    console.log(document.getElementById("inputText").value);
    console.log(chatname);
    console.log(socket.emit('message', { chatname: chatname, content: document.getElementById("inputText").value }));
    // Prints 4 times???
}