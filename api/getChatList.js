const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response) {

}

function model() {

    function doTheThing(request, response) {
        const { currentUserID } = request.body;

        const what = [
            'chat.chatname as "chatname"'
        ];
        const from = [
            'user',
            'chat',
            'chat_member'
        ];
        const where = [
            `${currentUserID} = chat_member.user_id`,
            'chat.id = chat_member.chat_id'
        ];

        db.select(what, from, where, true).then(chats => {
            response.status(200).end(JSON.stringify(chats));
        }).catch(err => {
            console.error(err);
            response.status(500).end(JSON.stringify({ error: err.message }));
        });
    }

    module.exports = { http, model };