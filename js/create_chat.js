class User{
    constructor(username, added = false, deleteForever = false){
        this.username = username;
        this.added = added;
        this.deleteForever = deleteForever;
        this.draw();
    }

    remove(){
        const elem = document.getElementById(`user-${this.username}`);
        if (elem){
            elem.parentElement.removeChild(elem);
        }
    }

    draw(){
        const div = document.createElement('div');
        const span = document.createElement('span')
        const btn = document.createElement('button');

        div.id = `user-${this.username}`;
        div.classList.add('contactRow');
        span.classList.add('username')
        span.innerHTML = this.username;

        btn.onclick = () => {
            this.added = !this.added;

            this.remove();
            if (!this.deleteForever){
                this.draw();
            }
        }

        div.appendChild(span)
        div.appendChild(btn);

        if (this.added){
            btn.classList.add('removeButton')
            btn.innerHTML = '-';
            document.getElementById('added').appendChild(div);
        }
        else{
            btn.classList.add('addButton')
            btn.innerHTML = '+';
            document.getElementById('not_added').appendChild(div);
        }
    }
}

const users = [];

fetchAPI('get-contact-list', {currentUserID: getCookie('currentUserID')}).then(res => {
    if (res.success){
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

function addUsername() {
    const username = document.getElementById('addUsername').value;
    if (username){
        for (const user of users){
            if (user.username == username){
                return alert('Username already added!');
            }
        }

        fetchAPI('check-for-username', {username}).then(exists => {
            if (exists){
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

function createChat() {
    const chatname = document.getElementById('chatname').value;
    if (!chatname){
        return alert('Enter a chatname!');
    }

    const usernames = [];
    for (const user of users){
        if (user.added){
            usernames.push(user.username);
        }
    }

    if (usernames.length < 1){
        return alert('Add at least 1 user!');
    }

    fetchAPI('create-chat', {currentUserID: getCookie('currentUserID'), chatname, usernames}).then(res => {
        if (res.success){
            window.location = '/chat-list';
        }
        else{
            alert(res.message);
        }
    }).catch(err => {
        alert(err.message);
    })
}