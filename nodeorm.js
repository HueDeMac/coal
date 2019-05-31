const fs = require('fs')
const mysql = require('mysql')
var config = fs.readFileSync('./config.json','utf8')		
var connection = mysql.createConnection(JSON.parse(config))
connection.connect()
module.exports = {connection}