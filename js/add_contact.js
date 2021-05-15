//const Contact = require("./Contact");

function addContact() {
    let username = document.getElementById("username-textarea").value;
    let nickname = document.getElementById("nickname-textarea").value;
    let notes = document.getElementById("notes-textarea").value;
    alert(`Contact to add: username: ${username}, nickname: ${nickname}, notes: ${notes}`);
    //let contact = new Contact(username, nickname, notes);
    //alert(contact.username);

}