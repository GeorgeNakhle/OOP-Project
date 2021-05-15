USE `chats_db`;

SELECT
    user.username AS 'Username',
    chat.chatname AS 'Chat Name',
    mesg.content AS 'Message Content',
    mesg.sent_on AS 'Message Sent On'
FROM
    user, chat, message mesg, chat_member memb
WHERE
    mesg.user_id = user.id AND
    mesg.chat_id = chat.id AND
    memb.user_id = user.id AND
    memb.chat_id = chat.id;