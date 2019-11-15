const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

const pathname = path.resolve(process.cwd(), 'environment.json');

const config = JSON.parse(fs.readFileSync(pathname, 'utf8'));

process.env.DB_HOST = config.host;
process.env.DB_PORT = config.port;
process.env.DB_USER = config.username;
process.env.DB_PASS = config.password;
process.env.DB_NAME = config.database;


const  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
connection.connect();
module.exports = { connection };