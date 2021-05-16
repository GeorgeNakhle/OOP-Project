const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);
//finds chats in the database  whose name contains the search string provided

function http(request, response){
    const {searchParams} = request.body;

    model(searchParams).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    });
}

function model(searchString){
    return new Promise((resolve, reject) => {
        if (!searchString){
            resolve({success: false, message: 'No search parameters provided!'});
        }
        else{
            const what = [
                'id', 
                'chatname', 
            ];
            const from = [
                'chat'
            ];
            const where = [
                `chatname LIKE "%${searchString}%"`, 
            ];
    
            db.select(what, from, where, true).then(chats => {
                resolve({success: true, chats});
            }).catch(reject);
        }
    })
}

module.exports = {http, model};