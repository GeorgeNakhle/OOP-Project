function onSubmit(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetchAPI('login', {username, password}).then(token => {
        setCookie(token);
        window.location = '/home';
    }).catch(err => {
        deleteCookie();
        console.error(err);
        alert(`Login error: ${err.message}!`);
    })
}