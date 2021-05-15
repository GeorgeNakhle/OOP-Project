USE `chats_db`;

DROP TABLE IF EXISTS `chat_member`;
DROP TABLE IF EXISTS `contact`;
DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `chat`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) UNIQUE NOT NULL,
    `password` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `chat`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `chatname` VARCHAR(20) UNIQUE NOT NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `message`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `chat_id` INT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `sent_on` BIGINT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`)
);

CREATE TABLE `contact`(
    `added_by` INT NOT NULL,
    `user_added` INT NOT NULL,
    `nickname` VARCHAR(20) DEFAULT NULL,
    `notes` VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (`added_by`, `user_added`),
    FOREIGN KEY (`added_by`) REFERENCES `user`(`id`),
    FOREIGN KEY (`user_added`) REFERENCES `user`(`id`)
);

CREATE TABLE `chat_member`(
    `user_id` INT NOT NULL,
    `chat_id` INT NOT NULL,

    PRIMARY KEY (`user_id`, `chat_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`)
);
