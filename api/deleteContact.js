const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {currentUserID, contactID, contactUsername} = request.body;

    // Check if contact user ID is set to determine which model to call
    if (contactID){
        modelByUserID(currentUserID, contactID).then(res => {
            response.status(200).end(JSON.stringify(res));
        }).catch(err => {
            console.error(err);
            response.status(500).end();
        })
    }
    else{
        modelByUsername(currentUserID, contactUsername).then(res => {
            response.status(200).end(JSON.stringify(res));
        }).catch(err => {
            console.error(err);
            response.status(500).end();
        })
    };
}

/**
 * Model for Deleting contact using their username
 * Takes the user ID of the user deleting contact
 * The username of the contact
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function modelByUsername(currentUserID, contactUsername){
    return new Promise((resolve, reject) => {
        // Check if contact username is set
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
                    // Get contact user ID and call the other model
                    helper.usernameToUserID(contactUsername).then(contactID => {
                        modelByUserID(currentUserID, contactID).then(resolve).catch(reject);
                    }).catch(reject);
                }
            }).catch(reject);
        };
    })
}

/**
 * Model for Deleting contact using their user ID
 * Takes the user ID of the user deleting contact
 * The user ID of the contact
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool}
 * Else
 *      {success: bool, message: string}
 */
function modelByUserID(currentUserID, contactID){
    return new Promise((resolve, reject) => {
        // Check if values are set
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!contactID){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            // Delete the contact and resolve
            db.delete('contact', [`added_by = ${currentUserID}`, `user_added = ${contactID}`]).then(del => {
                resolve({success: true});
            }).catch(reject);
        }
    })
}

module.exports = {http, modelByUsername, modelByUserID};