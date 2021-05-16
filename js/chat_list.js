function openChat(id) {
    window.location = `/chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}

function openOptions(id) {
    window.location = `/chat?id=${id}&currentUserID=${getCookie('currentUserID')}`;
}