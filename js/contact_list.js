if (!location.search.includes('currentUserID')){
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}
if (!getCookie('currentUserID')){
    window.location = '/login';
}
function displayInfo(username){
    window.location = `/contact-info?username=${username}`;
    //alert(username)
};

function addContact(){
    window.location = `/add-contact`;
}