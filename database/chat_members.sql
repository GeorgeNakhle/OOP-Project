USE `chats_db`;

SELECT
    user.username AS 'Username',
    chat.chatname AS 'Chat Name'
FROM
    user, chat, chat_member memb
WHERE 
    memb.user_id = user.id AND
    memb.chat_id = chat.id;