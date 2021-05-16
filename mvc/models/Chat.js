const Contact = require('../../classes/Contact');
const getChatMessages = require(`${process.env.api}/getChatMessages`).model

function doStuff(request) {
    let messages = [];
    return new Promise((resolve, reject) => {
        const currentUserID = request.query.currentUserID;
        const chatID = request.query.id;
        if (chatID) {
            getChatMessages(chatID).then(res => {
                if (res.success) {
                    messages = res.messages;

                    // Convert UNIX timestamp to Date
                    // Add field if message ID == current user ID
                    for (i = 0; i < messages.length; i++) {
                        messages[i].timestamp = new Date(messages[i].timestamp).toLocaleString();;

                        if (messages[i].userID == currentUserID) {
                            messages[i].isCurrent = true;
                        }
                    }

                    resolve({
                        header: "Chat!",
                        title: messages[0].chatname,
                        messages: messages,
                    });
                }
            });
        } else {
            resolve({
                header: "Chat!",
                title: messages[0].chatname,
            })
        }
    });
}



module.exports = { doStuff };