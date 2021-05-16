const Contact = require('../../classes/Contact');
const getChatMessages = require(`${process.env.api}/getChatMessages`).model

function timeConverter(UNIX_timestamp) {
    var date = new Date(UNIX_timestamp * 1000);
    return date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds();

}

function doStuff(request) {
    let messages = [];
    return new Promise((resolve, reject) => {
        const chatID = request.query.id;
        if (chatID) {
            getChatMessages(chatID).then(res => {
                if (res.success) {
                    messages = res.messages;

                    // Convert UNIX timestamp to Date
                    // Format Date object
                    for (i = 0; i < messages.length; i++) {
                        messages[i].timestamp = timeConverter(messages[i].timestamp);
                    }

                    resolve({
                        header: "Chat!",
                        title: "Chat",
                        messages: messages,
                    });
                }
            });
        } else {
            resolve({
                header: "Chat!",
                title: "Chat",
            })
        }
    });
}



module.exports = { doStuff };