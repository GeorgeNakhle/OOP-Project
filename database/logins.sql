USE `chats_db`;

SELECT
    user.username AS 'Username',
    user.password AS 'Password'
FROM
    user;