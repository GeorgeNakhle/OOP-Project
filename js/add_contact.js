function addContact() {

    //Current User cookies
    let currentUserID = getCookie('currentUserID');
    let currentUsername = getCookie('currentUsername');
    
    //HTML input
    let contactUsername = document.getElementById("username-textarea").value;
    let nickname = document.getElementById("nickname-textarea").value;
    let notes = document.getElementById("notes-textarea").value;
    
    if (!contactUsername){
        alert('Enter a username!');
    } else if (contactUsername == currentUsername) {
        alert ('You cannot add yourself as a contact!');
    } else {
        //check if contact already exists
        fetchAPI('get-contact-list', {currentUserID}).then(res => {
            if(res.find(contact => { return contact.username === contactUsername })){
                alert(`Contact error: user already in contacts`);
            } else {
                //add contact to DB
                fetchAPI('create-contact', {currentUserID, contactUsername, nickname, notes}).then(res => {
        
                    alert(`${contactUsername} added as contact!`);
                    window.location = '/contact-list';
                }).catch(err => {
                    console.error(err);
                    alert(`Contact error: ${err.message}!`);
                })
            } 
        }).catch(err => { 
            console.error(err);
            alert(`Contact error: ${err.message}!`);
        })
    } 
}