const db = require(`${process.env.database}/db`);

function doTheThing(request, response){
    const {currentUserID, contactID} = request.body;

    const what = [
        'added.id as "userID"', 
        'added.username as "username"', 
        'cont.nickname as "nickname"', 
        'cont.notes as "notes"'
    ];
    const from = [
        'user added',
        'contact cont'
    ];
    const where = [
        `added.id = ${contactID}`, 
        `cont.added_by = ${currentUserID}`,
        `cont.user_added = ${contactID}`
    ];

    db.select(what, from, where, true).then(contact => {
        response.status(200).end(JSON.stringify(contact[0]));
    }).catch(err => {
        console.error(err);
        response.status(500).end(JSON.stringify({error: err.message}));
    });
}

module.exports = doTheThing;