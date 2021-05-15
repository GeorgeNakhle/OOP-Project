USE `chats_db`;

SELECT
    adder.username AS 'Added By',
    added.username AS 'User Added'
FROM
    contact c, user adder, user added
WHERE
    c.added_by = adder.id AND
    c.user_added = added.id;