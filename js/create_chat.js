// Class for user row objects
class User{
    // Takes the username, a flag if the user is added by default, assumed false, and a flag if the user doesnt get redrawn if removed, assume false
    constructor(username, added = false, deleteForever = false){
        this.username = username;
        this.added = added;
        this.deleteForever = deleteForever;

        // Draw the current user
        this.draw();
    }

    // Remove the HTML element for this user
    remove(){
        const elem = document.getElementById(`user-${this.username}`);
        if (elem){
            elem.parentElement.removeChild(elem);
        }
    }

    // Create HTML element for this user
    draw(){
        // Div container
        const div = document.createElement('div');
        // Span for the username
        const span = document.createElement('span')
        // Button for adding or removing user
        const btn = document.createElement('button');

        // Set values ids and classes
        div.id = `user-${this.username}`;
        div.classList.add('contactRow');
        span.classList.add('username')
        span.innerHTML = this.username;

        btn.onclick = () => {
            // On button click invert the added flag
            this.added = !this.added;

            // Remove the current HTML element
            this.remove();
            // If flag not set, redraw user
            if (!this.deleteForever){
                this.draw();
            }
        }

        // Append inner elements to container
        div.appendChild(span)
        div.appendChild(btn);

        if (this.added){
            // if user is added, append element to added section, and set button to remove user
            btn.classList.add('removeButton')
            btn.innerHTML = '-';
            document.getElementById('added').appendChild(div);
        }
        else{
            // if user is not added, append element to not added section, and set button to add user
            btn.classList.add('addButton')
            btn.innerHTML = '+';
            document.getElementById('not_added').appendChild(div);
        }
    }
}

// List to store all the user objects
const users = [];

// Request a list of contacts for current user
fetchAPI('get-contact-list', {currentUserID: getCookie('currentUserID')}).then(res => {
    if (res.success){
        // If successfully got contacts, create user objects
        for (const contact of res.contacts){
            users.push(new User(contact.username));
        }
    }
    else{
        alert(res.message)
    }
}).catch(err => {
    alert(err.message)
})

// Method for manually adding a user by username
// Called by a button from HTML
function addUsername() {
    // Get and check if the username field is set
    const username = document.getElementById('addUsername').value;
    if (username){
        for (const user of users){
            if (user.username == username){
                return alert('Username already added!');
            }
        }

        // Check if username exists
        fetchAPI('check-for-username', {username}).then(exists => {
            if (exists){
                // If it does, create user object
                // Set flag to default be added
                // Set flag to not redraw upon removal
                users.push(new User(username, true, true));
            }
            else{
                alert('Username does not exist!');
            }
        })
    }
    else{
        alert('Enter a username!');
    }

    document.getElementById('addUsername').value = '';
}

// Method for creating chat
// Called by button press from HTML
function createChat() {
    // Get and check if user chat name is set
    const chatname = document.getElementById('chatname').value;
    if (!chatname){
        return alert('Enter a chatname!');
    }

    // Collect list of usernames of users to be added
    const usernames = [];
    for (const user of users){
        if (user.added){
            usernames.push(user.username);
        }
    }

    // Check if at least somebody is being added
    if (usernames.length < 1){
        return alert('Add at least 1 user!');
    }

    // Call API to create chat
    fetchAPI('create-chat', {currentUserID: getCookie('currentUserID'), chatname, usernames}).then(res => {
        if (res.success){
            // Upon success, redirect to the chat list page
            window.location = '/chat-list';
        }
        else{
            alert(res.message);
        }
    }).catch(err => {
        alert(err.message);
    })
}