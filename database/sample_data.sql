USE `chats_db`;

INSERT INTO `user`(`id`, `username`, `password`) VALUES 
    (1, 'ant tony', 'ANT TONY'),
    (2, 'ben jamming', 'BEN JAMMING'),
    (3, 'bugman', 'BUGMAN');

INSERT INTO `chat`(`id`, `chatname`) VALUES
    (1, 'cat'),
    (2, 'rat'),
    (3, 'bat');

INSERT INTO `contact`(`added_by`, `user_added`) VALUES
    (1, 2),
    (2, 1),
    (2, 3);

INSERT INTO `chat_member`(`user_id`, `chat_id`) VALUES 
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (2, 3),
    (3, 1),
    (3, 3);

INSERT INTO `message`(`id`, `user_id`, `chat_id`, `content`, `sent_on`) VALUES
    (1, 3, 1, 'i eat bug', 1618898940000),
    (2, 2, 1, 'same', 1618898940001),
    (3, 1, 1, 'thats messed up', 1618898940002),

    (4, 2, 2, 'hi', 1618898940004),
    (5, 1, 2, 'no', 1618898940005),

    (6, 3, 3, 'tomato', 1618898940006),
    (7, 2, 3, 'potato', 1618898940007);