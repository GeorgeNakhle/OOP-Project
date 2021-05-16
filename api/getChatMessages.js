const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response) {
    model(request.body.currentUserID).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    })
}

function model(chatID) {
    return new Promise((resolve, reject) => {
        if (!chatID) {
            resolve({ success: false, message: 'No currentUserID provided!' });
        }
        else {
            const what = [
                'message.id as "messageID"',
                'chat_id as "chatID"',
                'message.user_id as "userID"',
                'user.username as "username"',
                'message.content as "content"',
                'message.sent_on as "timestamp"',
                'chat.chatname as "chatname"',
            ];
            const from = [
                'user',
                'message',
                'chat'
            ];
            const where = [
                `${chatID} = message.chat_id`,
                `${chatID} = chat.id`,
                `user.id = message.user_id`
            ];

            db.select(what, from, where, true).then(messages => {
                resolve({ success: true, messages });
            }).catch(reject);
        }
    })
}

module.exports = { http, model };