const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    model(request.body.currentUserID).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    })
}

function model(currentUserID){
    return new Promise((resolve, reject) => {
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else{
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
    
            db.select(what, from, where, true).then(contacts => {
                resolve({success: true, contacts});
            }).catch(reject);
        }
    })
}

module.exports = {http, model};