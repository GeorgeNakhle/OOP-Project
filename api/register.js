const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {username, password} = request.body;

    model(username, password).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    });
}

/**
 * Model for registering
 * Takes the username and password of the user to create
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool, currentUserID: int, currentUsername: string}
 * Else
 *      {success: bool, message: string}
 */
function model(username, password){   
    return new Promise((resolve, reject) => {
        // Check if values are set
        if (!username){
            resolve({success: false, message: 'No username provided!'});
        }
        else if (!password){
            resolve({success: false, message: 'No password provided!'});
        }
        else{
            // Check if username already exists
            helper.checkIfUsernameExists(username).then(exists => {
                if (exists){
                    resolve({success: false, message: 'Username already exists!'});
                }
                else{
                    // Create user and resolve
                    db.insert('user', {username, password}).then(insert => {
                        resolve({success: true, currentUserID: insert.insertId, currentUsername: username});
                    }).catch(reject);
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, model};