if (getCookie('username')){
    alert(`Already logged in as ${getCookie('username')}!`);
    window.location = '/home';
}

function onSubmit(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username){
        alert('Enter a username!')
    }
    else if (!password){
        alert('Enter a password!');
    }
    else{
        fetchAPI('login', {username, password}).then(res => {
            setCookie('userID', res.userID);
            setCookie('username', res.username);

            window.location = '/home';
        }).catch(err => {
            clearCookies();
            console.error(err);
            alert(`Login error: ${err.message}!`);
        })
    }
}

function goRegister(){
    window.location = '/register';
}