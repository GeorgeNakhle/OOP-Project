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
 * Model for logging in
 * Takes the username and password
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
            // Check if user with username and password combination exists
            db.count(['user'], [`password = '${password}'`, `username = '${username}'`]).then(count => {
                if (count == 0){
                    resolve({success: false, message: 'Invalid username or password!'});
                }
                else{
                    // Get user stuff, and resolve
                    db.select(['id', 'username'], ['user'], [`password = '${password}'`]).then(select => {
                        resolve({success: true, currentUserID: select[0].id, currentUsername: select[0].username});
                    }).catch(reject)
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, model};