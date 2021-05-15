const mysql = require('mysql');

function connect(){
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.database_host, 
            port: process.env.database_port,
            user: process.env.database_user, 
            password: process.env.database_password
        });
        con.connect(err => {
            if (err){
                return reject(err);
            }
            else{
                resolve(con);
            }
        })
    });
}

function _query(query){
    return new Promise((resolve, reject) => {
        connect().then(con => {
            con.query(query, (error, results) => {
                con.end();

                if (error) reject(error);
                else resolve(results);
            });
        })
    })
}

function _getUserIDFromUsername(username){
    return new Promise((resolve, reject) => {
        // _query(`SELECT id FROM user WHERE user.username = '${username}'`).then(res => {
        //     console.log(res);
        // }).catch(reject);
    });
}

function getEverythingForUserByUsername(username){
    return new Promise((resolve, reject) => {
        // _getUserIDFromUsername(username).then(id => {
        //     getEverythingForUserByUserID(id).then(resolve).catch(reject);
        // }).catch(reject);
    });
}

function getEverythingForUserByUserID(userID){
    return new Promise((resolve, reject) => {

    });
}

module.exports = {getEverythingForUserByUsername, getEverythingForUserByUserID};