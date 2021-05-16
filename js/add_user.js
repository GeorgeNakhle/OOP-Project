if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function addUsername() {
    let username = document.getElementById("addUsername").value;
    let chat_id = getSearchParameters().id;
    if (!username){
        alert("error: input username");
        return;
    }
    fetchAPI('get-chat-members', {chat_id: chat_id}).then(res => {
        if(res.success){
            let members = res.members;
            if (members.some(mem => mem.username === username)) {
                alert("error: user is already in chat");
                return
            } else {
                fetchAPI('add-to-chat', {chat_id: chat_id, username: username }).then(res => {
                    if(res.success){
                        alert(`successfully added user to the chat!`);
                        window.location = `/chat?currentUserID=${getCookie('currentUserID')}&id=${chat_id}`
                    } else {
                        alert("failed to join chat");
                    }
                });
            }
        }
    })

    
}
function addContact(id) {
    

    console.log(id);
    let chat_id = getSearchParameters().id;

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


function getSearchParameters() {
    let prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    let params = {};
    let prmarr = prmstr.split("&");
    for ( let i = 0; i < prmarr.length; i++) {
        let tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}