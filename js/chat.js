if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}
else{
    // (Antony)
    // Loop over each key value param in the URL
    for (const kv of location.search.substr(1).split('&')){
        // If key is for the chat ID
        if (kv.split('=')[0] == 'id'){
            // Send a hello to the socket server containing the current user ID, current username, and currently open chat ID
            socket.emit('hello', {userID: getCookie('currentUserID'), chatID: kv.split('=')[1], username: getCookie('currentUsername')});
        }
    }
}

// Refresh page when message is received
socket.on("message", (data) => {
    // Get data from the message object
    const {username, content, sentOn} = data;

    // Create message container
    const ul = document.createElement('ul');
    // Create inner HTML elements
    const liUsername = document.createElement('li');
    const liContent = document.createElement('li');
    const liDate = document.createElement('li');

    // Add the classes to the elements
    ul.classList.add('chatMessage');
    liUsername.classList.add('messageContact');
    liContent.classList.add('messageText')
    liDate.classList.add('messageDate')

    // Add the test content to the elements
    liUsername.innerHTML = username;
    liContent.innerHTML = content;
    // Convert timestamp to string date
    liDate.innerHTML = new Date(sentOn).toLocaleString();

    // Append inner elements to container
    ul.appendChild(liUsername)
    ul.appendChild(liContent)
    ul.appendChild(liDate);
    // Append message element to bottom of scroll element
    document.getElementById('scroll').appendChild(ul);

    // Scroll down the list
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