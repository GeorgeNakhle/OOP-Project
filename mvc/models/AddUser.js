const getChatMembers = require(`${process.env.api}/getChatMembers`)
const getContactList = require(`${process.env.api}/getContactList`)

function doStuff(request) {
    return new Promise((resolve, reject) => {

        let addedContacts = [
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            },
            {
                username: "Johnny Sins"
            }
        ];

        let contactsList = [
            {
                username: "Meg Thomas"
            },
            {
                username: "Meg Thomas"
            },
            {
                username: "Meg Thomas"
            },
            {
                username: "Meg Thomas"
            },
            {
                username: "Meg Thomas"
            },
            {
                username: "Meg Thomas"
            }
        ];

        resolve({
            content: "this is some example content from the AddUser model",
            addedContacts: addedContacts,
            contactsList: contactsList
        })
    });
}



module.exports = { doStuff };