const db = require(`${process.env.database}/db`);

function doTheThing(request, response){
    const id = request.body.userID;

    db.select(['added.id as "userID"', 'added.username as "username"', 'cont.nickname as "nickname"'], ['user added', 'contact cont'], ['added.id = cont.user_added', `cont.added_by = ${id}`], true).then(contacts => {
        response.status(200).end(JSON.stringify(contacts));
    }).catch(err => {
        console.error(err);
        response.status(500).end(JSON.stringify({error: err.message}));
    });
}

module.exports = doTheThing;