const getChatList = require(`${process.env.api}/getChatList`).model

function doStuff(request) {
    // Array to be passed into view
    let chats = [];
    return new Promise((resolve, reject) => {

        // Current User ID from request response
        const currentUserID = request.query.currentUserID;
        if (currentUserID) {
            getChatList(currentUserID).then(res => {
                if (res.success) {
                    // Get query results from API
                    chats = res.chats;

                    resolve({
                        header: "Chat List!",
                        title: "Chat List",
                        chats: chats,
                    });
                }
            });
        } else {
            resolve({
                header: "Chat List!",
                title: "Chat List",
            })
        }
    });
}

module.exports = { doStuff };