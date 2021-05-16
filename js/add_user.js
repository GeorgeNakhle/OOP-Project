if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUsername() {
    //add by username
    alert("add username");
}
function addContact(id) {
    console.log(id);
    let chat_id = 1;
    fetchAPI('add-to-chat', {chat_id: chat_id, user_id: id }).then(res => {
        if(res.success){
            alert(`successfully added user to the chat!`);
            window.location = `/chat?currentUserID=${getCookie('currentUserID')}&id=${chat_id}`
        } else {
            alert("failed to join chat");
        }
    });
    //add from contacts
    //alert("add contact");
}
