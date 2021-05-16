const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response) {
    model(request.body.currentUserID).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    })
}

/**
 * Model for getting contact list of a user
 * Takes the user ID of the user who's contact list to get
 * 
 * Resolves with a success flag, or rejects with an error.
 * If success
 *      {success: bool: contacts[]: {userID: int, username: string, nickname: string|null}}
 * Else
 *      {success: bool, message: string}
 */
function model(currentUserID) {
    return new Promise((resolve, reject) => {
        // Check if value is set
        if (!currentUserID) {
            resolve({ success: false, message: 'No currentUserID provided!' });
        }
        else {
            // Select query stuff
            const what = [
                'added.id as "userID"',
                'added.username as "username"',
                'cont.nickname as "nickname"'
            ];
            const from = [
                'user added',
                'contact cont'
            ];
            const where = [
                'added.id = cont.user_added',
                `cont.added_by = ${currentUserID}`
            ];

            // Select from db, and resolve with list of contacts
            db.select(what, from, where, true).then(contacts => {
                resolve({ success: true, contacts });
            }).catch(reject);
        }
    })
}

module.exports = { http, model };