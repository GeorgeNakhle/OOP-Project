const User = require('./User');

class Contact extends User {
    constructor(username, nickname = "", notes = ""){
        super(username);
        this.nickname = nickname;
        this.notes = notes;
    }


}

module.exports = Contact;