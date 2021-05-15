const db = require(`${process.env.database}/db`);

function usernameToUserID(username){
    return new Promise((resolve, reject) => {
        checkIfUsernameExists(username).then(exists => {
            if (exists){
                db.select(['id'], ['user'], [`username = '${username}'`], true).then(res => {
                    resolve(res[0].id);
                }).catch(reject);
            }
            else{
                reject(new Error('username does not exist'));
            }
        }).catch(reject);
    })
}

function checkIfUsernameExists(username){
    return new Promise((resolve, reject) => {
        db.count(['user'], [`username = '${username}'`]).then(count => {
            resolve(count > 0);
        }).catch(reject);
    })
}

module.exports = {usernameToUserID, checkIfUsernameExists};