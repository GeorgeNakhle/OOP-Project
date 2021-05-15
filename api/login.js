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
            db.count(['user'], [`password = '${password}'`, `username = '${username}'`]).then(count => {
                if (count == 0){
                    resolve({success: false, message: 'Invalid username or password!'});
                }
                else{
                    db.select(['id', 'username'], ['user'], [`password = '${password}'`]).then(select => {
                        resolve({success: true, currentUserID: select[0].id, currentUsername: select[0].username});
                    }).catch(reject)
                }
            }).catch(reject);
        }
    })
}

module.exports = {http, model};