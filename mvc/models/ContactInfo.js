const Contact = require('../../classes/Contact');
const getContactInfo = require(`${process.env.api}/getContactInfo`)

function doStuff(request){
    return new Promise((resolve, reject) => {
        let contactID = request.query.id;
        const currentUserID = request.query.currentUserID;

        if(currentUserID){
            getContactInfo.modelByUserID(currentUserID, contactID).then(res => {
                if(res.success){
                    resolve({
                        username: res.contact.username,
                        nickname: res.contact.nickname,
                        notes: res.contact.notes,
                        id: res.contact.userID,
                    });
                } else {
                    resolve({});
                }
                
            });
        }

        
        
        //let contact = new Contact(getParams.id, `${getParams.id}'s nickname`, "notes notes notes, met in 2003 while hiking through a minefield.");
       
    });
}



module.exports = {doStuff};