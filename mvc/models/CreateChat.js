const getContactList = require(`${process.env.api}/getContactList`).model;

function doStuff(request) {
    return new Promise((resolve, reject) => {
        const currentUserID = request.query.currentUserID;
        if (currentUserID){
            getContactList(currentUserID).then(res => {
                if (res.success){
                    resolve({addedContacts: [{username: 'testy1'}, {username: 'testy1'}], contactsList: res.contacts})
                }
                else{
                    resolve({addedContacts: [],contactsList: []})
                }
            });
        }
        else{
            resolve({addedContacts: [],contactsList: []})
        }
    });
}



module.exports = { doStuff };