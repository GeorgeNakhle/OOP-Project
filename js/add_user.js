if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUsername() {
    //add by username
    alert("add username");
}
function addContact() {
    //add from contacts
    alert("add contact");
}
