const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {currentUserID, contactID, contactUsername} = request.body;

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
 * Model for getting contact info using contact username
 * Takes the user ID of the user who made the contact
 * The username of the contact
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool, contact: {userID: int, username: string, nickanme: string|null, notes: string|null}}
 * Else
 *      {success: bool, message: string}
 */
function modelByUsername(currentUserID, contactUsername){
    return new Promise((resolve, reject) => {
        // Check if value is set
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
        }
    })
}

/**
 * Model for getting contact info using contact user ID
 * Takes the user ID of the user who made the contact
 * The user ID of the contact
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool, contact: {userID: int, username: string, nickanme: string|null, notes: string|null}}
 * Else
 *      {success: bool, message: string}
 */
function modelByUserID(currentUserID, contactID){
    console.log(currentUserID, contactID);
    return new Promise((resolve, reject) => {
        // Check if values are set
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!contactID){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            // Select query stuff
            const what = [
                'added.id as "userID"', 
                'added.username as "username"', 
                'cont.nickname as "nickname"', 
                'cont.notes as "notes"'
            ];
            const from = [
                'user added',
                'contact cont'
            ];
            const where = [
                `added.id = ${contactID}`, 
                `cont.added_by = ${currentUserID}`,
                `cont.user_added = ${contactID}`
            ];
        
            // Select the contact from the database
            db.select(what, from, where, true).then(contacts => {
                // Check if something was obtained from query
                if (contacts.length == 0){
                    resolve({success: false, message: 'Contact does not exist!'});
                }
                else{
                    // Resolve with the first contact in list of 1 contacts
                    resolve({success: true, contact: contacts[0]});
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, modelByUsername, modelByUserID};