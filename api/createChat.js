const db = require(`${process.env.database}/db`);
const helper = require(`${process.env.api}/helper`);

function http(request, response){
    const {currentUserID, chatname, usernames} = request.body;

    model(currentUserID, chatname, usernames).then(res => {
        response.status(200).end(JSON.stringify(res));
    }).catch(err => {
        console.error(err);
        response.status(500).end();
    })
}

function model(currentUserID, chatname, usernames){
    return new Promise((resolve, reject) => {
        if (!currentUserID){
            resolve({success: false, message: 'No currentUserID provided!'});
        }
        else if (!chatname){
            resolve({success: false, message: 'No chatname provided!'});
        }
        else{
            db.insert('chat', {chatname}).then(chatInsert => {
                const chatID = chatInsert.insertId;
                const userIDs = [currentUserID];

                const promises = [];

                for (const username of usernames){
                    const prom = helper.usernameToUserID(username).then(userID => {
                        if (!userIDs.includes(userID)){
                            userIDs.push(userID);
                            db.insert('chat_member', {chat_id: chatID, user_id: userID}).then(membInsert => {

                            }).catch(reject);
                        }
                    }).catch(reject);

                    promises.push(prom);
                }

                Promise.all(promises).then(() => {
                    resolve({success: true});
                }).catch(reject);
            }).catch(reject);
        }
    })
}

module.exports = {http, model};