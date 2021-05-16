const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {currentUserID, chatname} = request.body;

    model(currentUserID, chatname).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    });
}

function model(currentUserID, chatname){
    return new Promise((resolve, reject) => {
        helper.checkIfChatnameExists(chatname).then(exists => {
            if (exists){
                helper.chatnameToChatID(chatname).then(chatID => {
                    db.delete('chat_member', [`chat_id = ${chatID}`, `user_id = ${currentUserID}`]).then(del => {
                        resolve({success: true});
                    }).catch(reject);
                }).catch(reject);
            }
            else{
                resolve({success: true, message: 'Chatname does not exist!'});
            }
        }).catch(reject);
    });
}

module.exports = {http, model};