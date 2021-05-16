const db = require(`${process.env.database}/db`);

// Convert username to user ID
// Resolves with an int user ID or
// Rejects with an error
function usernameToUserID(username){
    return new Promise((resolve, reject) => {
        // Check if username exists
        checkIfUsernameExists(username).then(exists => {
            if (exists){
                // Get user ID and resolve with it
                db.select(['id'], ['user'], [`username = '${username}'`], true).then(res => {
                    resolve(res[0].id);
                }).catch(reject);
            }
            else{
                reject(new Error('username does not exist'));
            }
        }).catch(reject);
    })
}

// Check if a username exists
// Resolves a bool, true if username exists, false if not
// Rejects with an error
function checkIfUsernameExists(username){
    return new Promise((resolve, reject) => {
        // Count from database and resolve
        db.count(['user'], [`username = '${username}'`]).then(count => {
            resolve(count > 0);
        }).catch(reject);
    })
}

// Convert chat name to chat ID
// Resolves with an int chat ID or
// Rejects with an error
function chatnameToChatID(chatname){
    return new Promise((resolve, reject) => {
        // Check if chat name exists
        checkIfChatnameExists(chatname).then(exists => {
            if (exists){
                // Get the chat ID and resolve with it
                db.select(['id'], ['chat'], [`chatname = '${chatname}'`], true).then(res => {
                    resolve(res[0].id);
                }).catch(reject);
            }
            else{
                reject(new Error('chatname does not exist'));
            }
        }).catch(reject);
    })
}

// Check if a chat name exists
// Resolves a bool, true if username exists, false if not
// Rejects with an error
function checkIfChatnameExists(chatname){
    return new Promise((resolve, reject) => {
        // Count in database and resolve
        db.count(['chat'], [`chatname = '${chatname}'`]).then(count => {
            resolve(count > 0);
        }).catch(reject);
    })
}

module.exports = {usernameToUserID, checkIfUsernameExists, chatnameToChatID, checkIfChatnameExists};