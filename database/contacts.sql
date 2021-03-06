USE `chats_db`;

SELECT
    adder.username AS 'Added By',
    added.username AS 'User Added',
    c.nickname AS 'Nickname',
    c.notes AS 'Notes'    
FROM
    contact c, user adder, user added
WHERE
    c.added_by = adder.id AND
    c.user_added = added.id;