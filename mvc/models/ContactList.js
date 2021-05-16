const Contact = require('../../classes/Contact');
const getContactList = require(`${process.env.api}/getContactList`).model


function doStuff(request){
    let contacts = [];
    return new Promise((resolve, reject) => {
        const currentUserID = request.query.currentUserID;
        if(currentUserID){
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
                    let alphabetList = {};

                    //put each user into an array split by first character of username
                    contacts.forEach(function(user){
                        let firstChar = user.username.charAt(0).toUpperCase(); 
                        
                        if(!alphabetList[firstChar]){
                            alphabetList[firstChar] = [user];
                        } else {
                            alphabetList[firstChar].push(user);
                        }
                    
                    });
                    
                    resolve({
                        header: "Contact List!",
                        title: "Contacts",
                        payload: alphabetList,
                    });
                }
            });
        } else {
            resolve({
                header: "Contact List!",
                title: "Contacts",
            })
        }
    });
}



module.exports = {doStuff};