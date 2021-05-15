const User = require('./User');
class CurrentUser extends User {
    constructor(username){
        super(username)
    }

}

module.exports = CurrentUser;