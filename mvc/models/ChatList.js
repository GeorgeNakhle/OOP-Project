function doStuff(request) {
    return new Promise((resolve, reject) => {

        const getContactList = require(`${process.env.api}/get-chat-list`);
        getContactList.model(currentUserID).then(res => {
            if (res.success) {
                // the stuff is in res.contacts
            }
            else {
                // error message in res.message
            }
        }).catch(err => {
            // err is the error object
        })

        resolve({
            payload: alphabetList,
        })
    });
}



module.exports = { doStuff };