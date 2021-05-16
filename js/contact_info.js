if (!getCookie('currentUserID')){
    window.location = '/login';
}
const currentUserID = getCookie('currentUserID');

function editContact(){
    let username = document.getElementById("username").value;
    let nickname = document.getElementById("nickname-textarea").value;
    let notes = document.getElementById("notes-textarea").value;
    alert(`contact to be edited: ${username}, nickname: ${nickname}, notes: ${notes}`);

    //TODO: Edit contact 
}

function deleteContact(){
    let username = document.getElementById("username").value;
    alert(`contact to be deleted: ${username}`)
    //TODO: Delete contact
}