# Team Talk

![TeamTalk_logo](img/favicon.ico)

**Authors**: George Nakhle, Benjamin Rouleau, Antony Vasiliev

## About

Team Talk is a simple to use instant messaging application written in JavaScript, Handlebars, HTML and CSS using **Node.js**.\
This application takes advantage of Node.js models such as:
- `http`
- `express`
- `socket.io`
- `path`
- `body-parser`
- `dotenv`

## Overview

- **Chatting**
    - Create chats.
    - Search for chats by the username.
    - Get a list of all the chats you’re currently in.
    - Chat with people from across the world!
    - Add new users to chats you’re in.
- **Contact System**
    - Get a list of all your contacts.
    - Click on a contact to get more info on them.
    - Add contacts to your Contact List by username.

## First-Time Setup instructions:
1. Download and Install [NodeJS](https://nodejs.org/en/)
2. In a terminal, head to the root of this project
3. Run '`npm run setup`' for first-time setup

## Running Server with Default Settings:
1. In a terminal, head to the root of this project
2. Run '`npm run start`' to start the server
5. In your browser of choice, go to http://[HOST_IP]:[8080], where
    - `HOST_IP` is the hostname of the machine running the server ([127.0.0.1:8080](http://127.0.0.1:8080) running on local machine)

## Running Server with Custom Settings:
1. Open .env in your editor of choice (should be at the root of the project, might be hidden if on a unix-based OS)
2. Edit any of the environment variable to suit your needs:
    - `DATABASE_HOST` - A string hostname for the MySQL database server. Can be domain, or url
    - `DATABASE_PORT` - An integer port for the MySQL database server
    - `DATABASE_USER` - The user you wish to login as to your MySQL database server
    - `DATABASE_PASSWORD` - The password for the `DATABASE_USER`
    - `PORT` - The port you will use to connect to the server in your browser
3. In a terminal, head to the root of this project
4. Run 'npm run start' to start the server
5. In your browser of choice, go to http://[HOST_IP]:[PORT], where
    - `HOST_IP` is the hostname of the machine running the server (127.0.0.1 running on local machine)
    - `PORT` is port set in the .env file
