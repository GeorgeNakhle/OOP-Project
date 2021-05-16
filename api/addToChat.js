const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {chat_id, user_id} = request.body;

    model(chat_id, user_id).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    });
}

function model(chat_id, user_id){
    return new Promise((resolve, reject) => {
        if (!chat_id){
            resolve({success: false, message: 'No chat id provided!'});
        }
        else if (!user_id){
            resolve({success: false, message: 'No user id provided!'});
        }
        else{
            db.insert('chat_member', {chat_id: chat_id, user_id: user_id}).then(insert => {
                resolve({success: true});
            }).catch(reject);
        }
    })
}

module.exports = {http, model};