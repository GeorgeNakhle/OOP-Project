const getChatList = require(`${process.env.api}/getChatList`).model

function doStuff(request) {
    let chats = [];
    return new Promise((resolve, reject) => {

        const currentUserID = request.query.currentUserID;
        if (currentUserID) {
            getChatList(currentUserID).then(res => {
                if (res.success) {
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