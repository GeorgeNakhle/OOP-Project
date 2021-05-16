const getChatMembers = require(`${process.env.api}/getChatMembers`).model
const getContactList = require(`${process.env.api}/getContactList`).model

function doStuff(request) {
    return new Promise((resolve, reject) => {

        let currentChatID = 1 //request.query.chatid
        let currentUserID = 6 //request.query.currentUserID;
        let contacts = [];
        let addedContacts = [];
        getContactList(currentUserID).then(res => {
            if(res.success){
                contacts = res.contacts.sort(function(a, b) {
                    var userA = a.username.toUpperCase(); 
                    var userB = b.username.toUpperCase(); 
                    if (userA < userB) {
                      return -1;
                    }
                    if (userA > userB) {
                      return 1;
                    }
                    return 0;
                });
                getChatMembers(currentChatID).then(res => {
                    if(res.success){
                        addedContacts = res.members;
                        let duplicateContacts = [];
                        contacts.forEach(function(contact){
                            if(addedContacts.find(function(user){
                                return user.username == contact.username
                            })){
                                duplicateContacts.push(contact);
                            }
                        });
                        contacts = contacts.filter((contact) => !duplicateContacts.includes(contact));

                        
                        resolve({
                            addedContacts: addedContacts,
                            contacts: contacts,
                        })
                    }
                })
                
                
            }
        });

       
    });
}



module.exports = { doStuff };