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

function _query(query){
    return new Promise((resolve, reject) => {
        connect().then(con => {
            console.log(query);
            con.query(query, (error, results) => {
                con.end();

                if (error) reject(error);
                else resolve(results);
            });
        })
    })
}

function count(from, where){
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${from.join(', ')} WHERE ${where.join(' AND ')}`;
        _query(query).then(res => {
            resolve(res.length);
        }).catch(reject);
    })
}

function select(what, from, where, allow_empty = false){
    return new Promise((resolve, reject) => {
        let query = `SELECT ${what.join(', ')} FROM ${from.join(', ')} WHERE ${where.join(' AND ')}`;
        _query(query).then(res => {
            const normed = _normalizeMany(res);
            if (normed.length == 0 && !allow_empty){
                reject(new Error('select query resulted empty'));
            }
            else{
                resolve(normed);
            }
        }).catch(reject);
    })
}

function insert(table, values){
    return new Promise((resolve, reject) => {
        const keys = [];
        const vals = [];

        for (const key in values){
            const val = values[key];

            keys.push('`' + key + '`');
            
            if (typeof val == typeof 'string'){
                vals.push(`'${val}'`);
            }
            else{
                vals.push(val);
            }
        }

        const query = `INSERT INTO ${table}(${keys}) VALUES (${vals});`;
        _query(query).then(res => {
            const normed = _normalize(res);
            resolve(normed);
        }).catch(reject);
    })
}

module.exports = {select, insert, count};