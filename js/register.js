if (getCookie('username')){
    alert(`Already logged in as ${getCookie('username')}!`);
    window.location = '/home';
}

function onSubmit(){
    const username = document.getElementById('username').value;
    const passwords = document.getElementsByClassName('password');

    if (!username){
        alert('Enter a username!')
    }
    else if (!passwords[0].value || !passwords[1].value){
        alert('Enter a password!');
    }
    else if (passwords[0].value != passwords[1].value){
        alert('Passwords do not match!');
    }
    else{
        const password = passwords[0].value;

        fetchAPI('register', {username, password}).then(res => {
            setCookie('userID', res.userID);
            setCookie('username', res.username);
            
            window.location = '/home';
        }).catch(err => {
            clearCookies();
            console.error(err);
            alert(`Register error: ${err.message}!`);
        })
    }
}