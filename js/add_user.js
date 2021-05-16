if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUsername() {
    alert("add username");
}

function removeUser() {
    alert("remove user");
}

function addContact() {
    alert("add contact");
}

function addUsers() {
    alert("add users");
}