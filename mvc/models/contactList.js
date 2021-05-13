let dummyContacts = [
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
    {username: "Adam Adamson"},
    {username: "Steez McClaine"},
    {username: "Steeeve"},
    {username: "Darryl Diggsby"},
    {username: "Berry Baseball"},
    {username: "Alex Alexson"},
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