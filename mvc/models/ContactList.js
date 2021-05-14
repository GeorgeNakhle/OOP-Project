const Contact = require('../../classes/Contact');


let dummyContacts = [
    new Contact("Blibla"),
    new Contact("greag"),
    new Contact("steez"),
    new Contact("Ant Tony"),
    new Contact("Jake"),
    new Contact("nik"),
    new Contact("ryan"),
    new Contact("todd"),
    new Contact("zak"),
    new Contact("zack"),
    new Contact("zach"),
    new Contact("zac"),
    new Contact("larry"),
    new Contact("harold"),
    new Contact("harold2"),
    new Contact("harold3"),
    new Contact("large_rodent"),
    new Contact("123man"),
    new Contact("$pecialcharacter"),
    new Contact("0hhh"),
    new Contact("%$@!%^"),
    new Contact("mark"),
    new Contact("markold"),
    new Contact("jimothy"),
    new Contact("jeralds"),
];


function doStuff(request){
    return new Promise((resolve, reject) => {

        dummyContacts = dummyContacts.sort(function(a, b) {
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
        dummyContacts.forEach(function(user){
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
        })
    });
}



module.exports = {doStuff};