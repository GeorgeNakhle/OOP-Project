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
        }
    })
}

function modelByUserID(currentUserID, contactID){
    console.log(currentUserID, contactID);
    return new Promise((resolve, reject) => {
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!contactID){
            resolve({success: false, message: 'No contact username provided!'});
        }
        else{
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
        
            db.select(what, from, where, true).then(contacts => {
                if (contacts.length == 0){
                    resolve({success: false, message: 'Contact does not exist!'});
                }
                else{
                    console.log(contacts[0]);
                    resolve({success: true, contact: contacts[0]});
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, modelByUsername, modelByUserID};