if (getCookie('currentUserID')){
    alert(`Already logged in as ${getCookie('currentUsername')}!`);
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
            setCookie('currentUserID', res.currentUserID);
            setCookie('currentUsername', res.currentUsername);

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