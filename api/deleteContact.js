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

    deleteContact(currentUserID, user_added).then((resolved) => {
        response.status(resolved.code).end(JSON.stringify(resolved.content));
    }).catch(rejected => {
        response.status(rejected.code).end({error: rejected.content.message});
    })
}

function deleteContact(added_by, user_added){
    return new Promise((resolve, reject) => {
        db.delete('contact', [`added_by = ${added_by}`, `user_added = ${user_added}`]).then(del => {
            resolve({code: 200, content: {}});
        }).catch(err => {
            console.error(err);
            reject({code: 500, content: new Error('Failed to delete contact')});
        });
    })
}

module.exports = doTheThing;