const db = require(`${process.env.database}/db`);

async function doTheThing(request, response){
    const {currentUserID, contactID, contactUsername, nickname, notes} = request.body;

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

    create(currentUserID, user_added, nickname, notes).then((resolved) => {
        response.status(resolved.code).end('{}');
    }).catch(rejected => {
        response.status(rejected.code).end({error: rejected.content.message});
    })
}

function create(added_by, user_added, nickname, notes){
    return new Promise((resolve, reject) => {
        db.insert('contact', {added_by, user_added, nickname, notes}).then(insert => {
            resolve({code: 200});
        }).catch(err => {
            console.error(err);
            reject({code: 500, content: new Error('Failed to create contact')});
        });
    })
}

module.exports = doTheThing;