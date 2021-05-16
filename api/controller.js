const router = require('express').Router();
const helper = require(`${process.env.api}/helper`);

router.post('/check-for-username', (request, response) => {
    helper.checkIfUsernameExists(request.body.username).then(exists => {
        response.status(200).end(JSON.stringify(exists))
    }).catch(err => {
        response.status(500).end(JSON.stringify({error: err.message}));
    });
});

router.post('/login', require(`${process.env.api}/login.js`).http);
router.post('/register', require(`${process.env.api}/register.js`).http);

router.post('/get-contact-list', require(`${process.env.api}/getContactList`).http);
router.post('/get-contact-info', require(`${process.env.api}/getContactInfo`).http);
router.post('/create-contact', require(`${process.env.api}/createContact`).http);
router.post('/update-contact', require(`${process.env.api}/updateContact`).http);
router.post('/delete-contact', require(`${process.env.api}/deleteContact`).http);

router.post('/get-chat-list', require(`${process.env.api}/getChatList`).http);
router.post('/get-chat-members', require(`${process.env.api}/getChatMembers`).http);
router.post('/get-chat-messages', require(`${process.env.api}/getChatMessages`).http);
router.post('/create-chat', require(`${process.env.api}/createChat`).http);
router.post('/add-to-chat', require(`${process.env.api}/addToChat`).http);

router.post('/search-for-chat', require(`${process.env.api}/searchForChat`).http);
router.post('/join-chat', require(`${process.env.api}/joinChat`).http);
router.post('/leave-chat', require(`${process.env.api}/leaveChat`).http);

// these will be using sockets, not http api
//      send message
//      get new message

module.exports = router;