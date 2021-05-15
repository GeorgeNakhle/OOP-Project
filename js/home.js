if (!getCookie('username')){
    window.location = '/login';
}

function logout(){
    clearCookies();
    window.location = '/login';
}