const Contact = require('../../classes/Contact');

function doStuff(request){
    return new Promise((resolve, reject) => {
        let getParams = request.query;
        //REPLACE WITH DB QUERY OR SOMETHING TO GET ACTUAL CONTACT
        let contact = new Contact(getParams.username, `${getParams.username}'s nickname`, "notes notes notes, met in 2003 while hiking through a minefield.");
        resolve({
            username: contact.username,
            nickname: contact.nickname,
            notes: contact.notes,
        })
    });
}



module.exports = {doStuff};