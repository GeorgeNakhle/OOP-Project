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

// Pass in currently logged in UserID
function model(currentUserID) {
    return new Promise((resolve, reject) => {
        if (!currentUserID) {
            resolve({ success: false, message: 'No currentUserID provided!' });
        }
        else {
            // SELECT clause
            const what = [
                'chat.chatname as "chatname"',
                'chat.id as "chat_id"'
            ];
            // FROM clause
            const from = [
                'chat',
                'chat_member',
            ];
            // WHERE clause
            const where = [
                `${currentUserID} = chat_member.user_id`,
                'chat.id = chat_member.chat_id'
            ];

            // Execute query
            db.select(what, from, where, true).then(chats => {
                const promises = [];
                // Loop over all queried chats
                for (const chat of chats) {
                    const chat_id = chat.chat_id;
                    const promise = db.count(["chat_member"], [`chat_member.chat_id = ${chat_id}`]).then(count => {
                        // Add count field to every chat object
                        // "count" contains number of users per chat
                        chat.count = count;
                    }).catch(reject);
                    promises.push(promise);
                }
                Promise.all(promises).then(() => {
                    // Return all chats
                    resolve({ success: true, chats });
                }).catch(reject);
            }).catch(reject);
        }
    })
}

module.exports = { http, model };