function doTheThing(request, response){
    const {username, password} = request.body;

    register(username, password).then(() => {
        generateToken().then(token => {
            response.status(200).end(JSON.stringify({token}));
        }).catch(err => {
            console.error(err);
            response.status(500).end(JSON.stringify({error: 'Unexpected server error'}));
        });
    }).catch(err => {
        console.log(err.message);
        response.status(400).end(JSON.stringify({error: err.message}));
    });
}

function register(u, p){
    const validUsers = [ 'user', 'test', 'reee' ];
    
    return new Promise((resolve, reject) => {
        if (!u){
            reject(new Error('invalid username'));
        }
        else if (!p){
            reject(new Error('invalid password'));
        }
        else if (validUsers.indexOf(u) >= 0){
            reject(new Error('username already exists'));
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

module.exports = doTheThing;