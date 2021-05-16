if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}
else{
    for (const kv of location.search.substr(1).split('&')){
        if (kv.split('=')[0] == 'id'){
            socket.emit('hello', {userID: getCookie('currentUserID'), chatID: kv.split('=')[1], username: getCookie('currentUsername')});
        }
    }
}

// Refresh page when message is received
socket.on("message", (data) => {
    const {username, content, sentOn} = data;

    const ul = document.createElement('ul');
    const liUsername = document.createElement('li');
    const liContent = document.createElement('li');
    const liDate = document.createElement('li');

    ul.classList.add('chatMessage');
    liUsername.classList.add('messageContact');
    liContent.classList.add('messageText')
    liDate.classList.add('messageDate')

    liUsername.innerHTML = username;
    liContent.innerHTML = content;
    liDate.innerHTML = new Date(sentOn).toLocaleString();

    ul.appendChild(liUsername)
    ul.appendChild(liContent)
    ul.appendChild(liDate);
    document.getElementById('scroll').appendChild(ul);

    scrollDown();
})

// Scroll to bottom when chat window loads
document.addEventListener('DOMContentLoaded', function () {
    scrollDown();
}, false);

function scrollDown(){
    var div = document.getElementById("scroll");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

// Takes a chatID and opens the Add User page for the chat
function addUser(id) {
    window.location = `/add-user?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function sendMessage(chatname) {
    // Get the text from inputText
    let inputText = document.getElementById("inputText").value;

    // JS alert is text field is empty
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