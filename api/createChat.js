const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

// HTTP handler
function http(request, response){
    // Get values from the POST body
    const {currentUserID, chatname, usernames} = request.body;

    // Call the model
    model(currentUserID, chatname, usernames).then(res => {
        // If handled, return result
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        // If unexpected error
        // Print error and send error code
        console.error(err);
        response.status(500).end();
    })
}

/**
 * Model for Creating Chat
 * Takes the user ID of the user creating chat
 * The name of the chat to create
 * List of usernames of users to add to chat
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function model(currentUserID, chatname, usernames){
    return new Promise((resolve, reject) => {
        // Check if values are set
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!chatname){
            resolve({success: false, message: 'No chatname provided!'});
        }
        else{
            // Create a chat in database
            db.insert('chat', {chatname}).then(chatInsert => {
                // Get the chat ID
                const chatID = chatInsert.insertId;
                // Create list of user IDs containing ID of user creating chat
                const userIDs = [currentUserID];

                const idProms = [];

                // Convert all the usernames to user IDs
                for (const username of usernames){
                    const prom = helper.usernameToUserID(username).then(userID => {
                        if (!userIDs.includes(userID)){
                            userIDs.push(userID);
                        }
                    }).catch(reject);

                    idProms.push(prom);
                }

                Promise.all(idProms).then(() => {
                    const insProms = [];

                    // Add users to the chat
                    for (const userID of userIDs){
                        const prom = db.insert('chat_member', {chat_id: chatID, user_id: userID}).then(membInsert => {

                        }).catch(reject);
                    }

                    Promise.all(insProms).then(() => {
                        // Create initial message and resolve
                        db.insert('message', {user_id: currentUserID, chat_id: chatID, content: 'Chat created!', sent_on: new Date().valueOf()}).then(ins => {
                            resolve({success: true});
                        });
                    }).catch(reject);
                }).catch(reject);
            }).catch(reject);
        }
    })
}

module.exports = {http, model};