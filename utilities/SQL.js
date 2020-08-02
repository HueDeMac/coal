const { connection } = require('../nodeorm')

class SQL {
    static run(query) {
        return new Promise((resolve, reject) => {
            connection.query(query, (e, r, f) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
    }
}

module.exports = { SQL }