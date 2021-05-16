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

/**
 * Model for leaving a chat
 * Takes the user ID of the user leaving the chat
 * the chat name of the chat to leave from
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function model(currentUserID, chatname){
    return new Promise((resolve, reject) => {
        // Check if chat name exists
        helper.checkIfChatnameExists(chatname).then(exists => {
            if (exists){
                // Get the chat ID
                helper.chatnameToChatID(chatname).then(chatID => {
                    // Remove the user from the chat and resolve
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