const db = require(`${process.env.database}/db`);

async function doTheThing(request, response){
    const {currentUserID, contactID, contactUsername} = request.body;

    let user_added = null;

    if (contactID){
        user_added = contactID;
    }
    else{
        try {
            await db.select(['id'], ['user'], [`username = '${contactUsername}'`]).then(res => {
                user_added = res[0].id;
            })
        } catch (error) {
            console.error(error);
            return response.status(500).end({error: error.message});
        }
    }

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
        `added.id = ${user_added}`, 
        `cont.added_by = ${currentUserID}`,
        `cont.user_added = ${user_added}`
    ];

    db.select(what, from, where, true).then(contact => {
        response.status(200).end(JSON.stringify(contact[0]));
    }).catch(err => {
        console.error(err);
        response.status(500).end(JSON.stringify({error: err.message}));
    });
}

module.exports = doTheThing;