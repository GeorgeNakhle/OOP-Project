if (!getCookie('currentUserID')){
    window.location = '/login';
}
const currentUserID = getCookie('currentUserID');

function editContact(id){

    let username = document.getElementById("username").value;
    let nickname = document.getElementById("nickname-textarea").value;
    let notes = document.getElementById("notes-textarea").value;

    fetchAPI('update-contact', {currentUserID: currentUserID, contactID: id, nickname: nickname, notes: notes }).then(res => {
        if(res.success){
           alert('contact sucessfully updated!'); 
           window.location = '/contact-list';
        } else {
            alert('failed to update contact.');
        }
    }).catch(err => { 
        console.error(err);
        alert(`Contact error: ${err.message}!`);
    })
    
}

function deleteContact(id){
    fetchAPI('delete-contact', {currentUserID: currentUserID, contactID: id }).then(res => {
        if(res.success){
           alert('contact sucessfully deleted!'); 
           window.location = '/contact-list';
        } else {
            alert('failed to delete contact.');
        }
    }).catch(err => { 
        console.error(err);
        alert(`Contact error: ${err.message}!`);
    })
}