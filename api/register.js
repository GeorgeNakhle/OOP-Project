const db = require(`${process.env.database}/db`);

function doTheThing(request, response){
    const {username, password} = request.body;

    register(username, password).then(resolved => {
        response.status(resolved.code).end(JSON.stringify(resolved.content));
    }).catch(rejected => {
        console.error(rejected.content.message);
        response.status(rejected.code).end(JSON.stringify({error: rejected.content.message}));
    });
}

function register(username, password){   
    return new Promise((resolve, reject) => {
        if (!username){
            reject({code: 400, content: new Error('invalid username')});
        }
        else if (!password){
            reject({code: 400, content: new Error('invalid password')});
        }
        else{
            db.count(['user'], [`user.username = '${username}'`]).then(count => {
                if (count > 0){
                    reject({code: 400, content: new Error('username already in use')});
                }
                else{
                    db.insert('user', {username, password}).then(insert => {
                        resolve({code: 200, content: {userID: insert.insertId, username}});
                    }).catch(err => {
                        console.error(err);
                        reject({code: 500, content: new Error('failed to register user')});
                    });
                }
            }).catch(err => {
                console.error(err);
                reject({code: 500, content: new Error('failed to count users')});
            });
        }
    })
}

module.exports = doTheThing;