const db = require(`${process.env.database}/db`);

function doTheThing(request, response){
    const {username, password} = request.body;

    verifyUsernamePassword(username, password).then(resolved => {
        response.status(resolved.code).end(JSON.stringify(resolved.content));
    }).catch(rejected => {
        console.log(rejected.content.message);
        response.status(rejected.code).end(JSON.stringify({error: rejected.content.message}));
    });
}

function verifyUsernamePassword(username, password){
    return new Promise((resolve, reject) => {
        if (!username){
            reject({code: 400, content: new Error('invalid username')});
        }
        else if (!password){
            reject({code: 400, content: new Error('invalid password')});
        }
        else{
            db.count(['user'], [`password = '${password}'`]).then(count => {
                if (count == 0){
                    reject({code: 400, content: new Error('invalid username or password')});
                }
                else{
                    db.select(['id', 'username'], ['user'], [`password = '${password}'`]).then(select => {
                        resolve({code: 200, content: {currentUserID: select[0].id, currentUsername: select[0].username}});
                    }).catch(err => {
                        console.error(err);
                        reject({code: 500, content: new Error('Failed to get user')});
                    })
                }
            }).catch(err => {
                console.error(err);
                reject({code: 500, content: new Error('Failed to count users')});
            });
        }
    })
}

module.exports = doTheThing;