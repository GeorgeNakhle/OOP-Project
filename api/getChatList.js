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

function model(currentUserID) {
    return new Promise((resolve, reject) => {
        if (!currentUserID) {
            resolve({ success: false, message: 'No currentUserID provided!' });
        }
        else {
            const what = [
                'chat.chatname as "chatname"',
                'chat.id as "chat_id"'
            ];
            const from = [
                'chat',
                'chat_member',
            ];
            const where = [
                `${currentUserID} = chat_member.user_id`,
                'chat.id = chat_member.chat_id'
            ];

            db.select(what, from, where, true).then(chats => {
                const promises = [];
                for (const chat of chats) {
                    const chat_id = chat.chat_id;
                    const promise = db.count(["chat_member"], [`chat_member.chat_id = ${chat_id}`]).then(count => {
                        chat.count = count;
                    }).catch(reject);
                    promises.push(promise);
                }
                Promise.all(promises).then(() => {
                    resolve({ success: true, chats });
                }).catch(reject);
            }).catch(reject);
        }
    })
}

module.exports = { http, model };