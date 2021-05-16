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

function model(username, password){   
    return new Promise((resolve, reject) => {
        if (!username){
            resolve({success: false, message: 'No username provided!'});
        }
        else if (!password){
            resolve({success: false, message: 'No password provided!'});
        }
        else{
            helper.checkIfUsernameExists(username).then(exists => {
                if (exists){
                    resolve({success: false, message: 'Username already exists!'});
                }
                else{
                    db.insert('user', {username, password}).then(insert => {
                        resolve({success: true, currentUserID: insert.insertId, currentUsername: username});
                    }).catch(reject);
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, model};