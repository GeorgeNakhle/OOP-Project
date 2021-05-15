const router = require('express').Router();

router.post('/login', require(`${process.env.api}/login.js`));
router.post('/register', require(`${process.env.api}/register.js`));

router.post('/get-contact-list', require(`${process.env.api}/getContactList`));
router.post('/get-contact-info', require(`${process.env.api}/getContactInfo`));
router.post('/create-contact', require(`${process.env.api}/createContact`));
router.post('/update-contact', require(`${process.env.api}/updateContact`));
router.post('/delete-contact', require(`${process.env.api}/deleteContact`));

router.post('/get-chat-list', require(`${process.env.api}/getChatList`));
router.post('/get-chat-members', require(`${process.env.api}/getChatMembers`));
router.post('/get-chat-messages', require(`${process.env.api}/getChatMessages`));
router.post('/create-chat', require(`${process.env.api}/createChat`));
router.post('/add-to-chat', require(`${process.env.api}/addToChat`));

router.post('/search-for-chat', require(`${process.env.api}/searchForChat`));
router.post('/join-chat', require(`${process.env.api}/joinChat`));
router.post('/leave-chat', require(`${process.env.api}/leaveChat`));

// these will be using sockets, not http api
//      send message
//      get new message

module.exports = router;