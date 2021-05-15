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
                con.query('USE `chats_db`', err => {
                    if (err){
                        reject(err);
                    }
                    else{
                        resolve(con);
                    }
                });
            }
        })
    });
}

function _normalize(rowDataPacket){
    const normed = {};
    for (const key in rowDataPacket){
        normed[key] = rowDataPacket[key];
    }
    return normed;
}

function _normalizeMany(rowDataPackets){
    const normed = [];
    for (const packet of rowDataPackets){
        normed.push(_normalize(packet));
    }
    return normed;
}

function query(query){
    return new Promise((resolve, reject) => {
        connect().then(con => {
            con.query(query, (error, results) => {
                con.end();

                if (error) reject(error);
                else resolve(_normalize(results));
            });
        })
    })
}

module.exports = {query};