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

function modelByUsername(currentUserID, contactUsername){
    return new Promise((resolve, reject) => {
        if (!contactUsername){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            helper.checkIfUsernameExists(contactUsername).then(exists => {
                if (!exists){
                    resolve({success: false, message: 'Contact username does not exist!'})
                }
                else{
                    helper.usernameToUserID(contactUsername).then(contactID => {
                        modelByUserID(currentUserID, contactID).then(resolve).catch(reject);
                    }).catch(reject);
                }
            }).catch(reject);
        };
    })
}

function modelByUserID(currentUserID, contactID){
    return new Promise((resolve, reject) => {
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!contactID){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
            db.delete('contact', [`added_by = ${currentUserID}`, `user_added = ${contactID}`]).then(del => {
                resolve({success: true});
            }).catch(reject);
        }
    })
}

module.exports = {http, modelByUsername, modelByUserID};