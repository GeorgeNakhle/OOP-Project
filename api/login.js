const router = require('express').Router();

const validUsers = {
    'user': 'pass',
    'test': 'pass',
    'reee': 'eeer'
}

// api/login => /
router.post('/', (request, response) => {
    const {username, password} = request.body;

    verifyUsernamePassword(username, password).then(() => {
        generateToken().then(token => {
            response.status(200).end(token);
        }).catch(err => {
            console.error(err);
            response.status(500).end();
        });
    }).catch(err => {
        console.log(err.message);
        response.status(400).end(err.message);
    });
});

function verifyUsernamePassword(u, p){
    return new Promise((resolve, reject) => {
        if (!u){
            reject(new Error('invalid username'));
        }
        else if (!p){
            reject(new Error('invalid password'));
        }
        else if (validUsers[u] !== p){
            reject(new Error('wrong username or password'));
        }
        else{
            resolve();
        }
    })
}

function generateToken(){
    return new Promise(resolve => {
        resolve('ersghnwogwahngwaegnweg');
    })
}

module.exports = router;