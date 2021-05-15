const db = require(`${process.env.database}/db`);

function doTheThing(request, response){
    const {currentUserID} = request.body;

    const what = [
        'added.id as "userID"', 
        'added.username as "username"', 
        'cont.nickname as "nickname"'
    ];
    const from = [
        'user added', 
        'contact cont'
    ];
    const where = [
        'added.id = cont.user_added', 
        `cont.added_by = ${currentUserID}`
    ];

    db.select(what, from, where, true).then(contacts => {
        response.status(200).end(JSON.stringify(contacts));
    }).catch(err => {
        console.error(err);
        response.status(500).end(JSON.stringify({error: err.message}));
    });
}

module.exports = doTheThing;