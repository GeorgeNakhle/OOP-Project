if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

function openChat(id) {
    window.location = `/chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function openOptions(id, chatname) {
    if (confirm(`Do you want to leave ${chatname}?`)) {
        // Leave the chat
        fetchAPI('leave-chat', { currentUserID: getCookie("currentUserID"), chatname: chatname }).then(res => {
            if (res.success) {
                location.reload();
            }
        });
    }
}