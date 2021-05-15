if (!getCookie('currentUserID')){
    window.location = '/login';
}

function logout(){
    clearCookies();
    window.location = '/login';
}