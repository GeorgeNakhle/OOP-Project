const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {currentUserID, contactID, contactUsername, nickname, notes} = request.body;

    // Check if contact user ID is set to determine which model to call
    if (contactID){
        modelByUserID(currentUserID, contactID, nickname, notes).then(res => {
            response.status(200).end(JSON.stringify(res));
        }).catch(err => {
            console.error(err);
            response.status(500).end();
        })
    }
    else{
        modelByUsername(currentUserID, contactUsername, nickname, notes).then(res => {
            response.status(200).end(JSON.stringify(res));
        }).catch(err => {
            console.error(err);
            response.status(500).end();
        })
    };
}

/**
 * Model for Creating contact using their username
 * Takes the user ID of the user creating contact
 * The username of the contact
 * Optional nickname
 * Optional notes
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function modelByUsername(currentUserID, contactUsername, nickname, notes){
    return new Promise((resolve, reject) => {
        // Check if username is set
        if (!contactUsername){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            // Check if username exists
            helper.checkIfUsernameExists(contactUsername).then(exists => {
                if (!exists){
                    resolve({success: false, message: 'Contact username does not exist!'})
                }
                else{
                    // Get the contacts user ID and call the other model
                    helper.usernameToUserID(contactUsername).then(contactID => {
                        modelByUserID(currentUserID, contactID, nickname, notes).then(resolve).catch(reject);
                    }).catch(reject);
                }
            }).catch(reject);
        }
    })
}

/**
 * Model for Creating contact using their user ID
 * Takes the user ID of the user creating contact
 * The user ID of the contact
 * Optional nickname
 * Optional notes
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function modelByUserID(currentUserID, contactID, nickname, notes){
    return new Promise((resolve, reject) => {
        // Check if values are set
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!contactID){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            // Create contact and resolve
            db.insert('contact', {added_by: currentUserID, user_added: contactID, nickname, notes}).then(insert => {
                resolve({success: true});
            }).catch(reject);
        }
    })
}

module.exports = {http, modelByUsername, modelByUserID};