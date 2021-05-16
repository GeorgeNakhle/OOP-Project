if (!location.search.includes('currentUserID')) {
    window.location = `${window.location}?currentUserID=${getCookie('currentUserID')}`;
}

// Takes a chatID and opens the selected chat
function openChat(id) {
    window.location = `/chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function openOptions(id, chatname) {
    // JS alert prompt for leaving the chat
    if (confirm(`Do you want to leave ${chatname}?`)) {
        // Leave the chat
        fetchAPI('leave-chat', { currentUserID: getCookie("currentUserID"), chatname: chatname }).then(res => {
            if (res.success) {
                // Refresh page to update Chat List
                location.reload();
            }
        });
    }
    // Cancel does nothing
}