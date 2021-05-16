if (!location.search.includes('currentUserID')){
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}
if (!getCookie('currentUserID')){
    window.location = '/login';
}
function displayInfo(id){
    window.location = `/contact-info?id=${id}&currentUserID=${getCookie('currentUserID')}`;
    //alert(username)
};

function addContact(){
    window.location = `/add-contact`;
}