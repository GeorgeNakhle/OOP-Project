const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {chat_id} = request.body;

    model(chat_id).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    });
}

function model(chat_id){
    return new Promise((resolve, reject) => {
        if (!chat_id){
            resolve({success: false, message: 'No chat id provided!'});
        }
        else{
            const what = [
                'user.username as "username"', 
                'user.id as "id"', 
            ];
            const from = [
                'user', 
                'chat_member'
            ];
            const where = [
                'user.id = chat_member.user_id', 
                `chat_member.chat_id = ${chat_id}`
            ];
    
            db.select(what, from, where, true).then(members => {
                resolve({success: true, members});
            }).catch(reject);
        }
    })
}

module.exports = {http, model};