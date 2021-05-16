if (!getCookie('currentUserID')){
    window.location = '/login';
}

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
        fetchAPI('check-for-username', {username: contactUsername}).then(res => {
            if(!res){
                alert(`User "${contactUsername}" does not exist. Please try again`)
            } else {
                //check if contact already exists
                fetchAPI('get-contact-list', {currentUserID: currentUserID}).then(res => {
                    console.log(res);
                    if(res.success && res.contacts.find(contact => { return contact.username === contactUsername })){
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
        }).catch(err => {
            console.error(err);
            alert(`Contact error: ${err.message}!`);
        })
        
        
    } 
}