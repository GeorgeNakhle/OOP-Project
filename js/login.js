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
            if (res.success){
                clearCookies();
                setCookie('currentUserID', res.currentUserID);
                setCookie('currentUsername', res.currentUsername);

                window.location = '/home';
            }
            else{
                console.log(res);
                alert(res.message);
            }
        }).catch(err => {
            console.error(err);
            alert(err.message);

            clearCookies();
        })
    }
}

function goRegister(){
    window.location = '/register';
}