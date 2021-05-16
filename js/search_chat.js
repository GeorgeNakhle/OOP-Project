if (!getCookie('currentUserID')){
    window.location = '/login';
}

function searchChat() {
    let searchString = document.getElementById('searchText').value;
    if(!searchString){
        alert('specify chat name');
        return;
    }
    window.location = `/search-chat?searchString=${searchString}&currentUserID=${getCookie('currentUserID')}`;
}

function openOptions() {
    alert("open options");
}

function joinChat(chat_id) {
    let currentUserID = getCookie('currentUserID');
    fetchAPI('get-chat-members', {chat_id: chat_id}).then(res => {
            if(res.success && res.members.find(member => { return member.id == currentUserID })){
                alert(`Chat error: You are already in this chat`);
            } else {
                fetchAPI('add-to-chat', {chat_id: chat_id, user_id: currentUserID }).then(res => {
                    if(res.success){
                        alert("successfully joined chat!");
                        window.location = `/chat?currentUserID=${currentUserID}&id=${chat_id}`
                    } else {
                        alert("failed to join chat");
                    }
                });
            }
    });
    
}