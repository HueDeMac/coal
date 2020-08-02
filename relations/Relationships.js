class Relationships {

    hasMany(From, To, f_id, l_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${To.table} where ${f_id}=${this[l_id]}`
            this.constructor.connection.query(query, (e, r, f) => {
                if (e) reject(e)
                else{
                    resolve(To.dto(r))
                }
            })
        })
    }

    belongsTo(From, To, f_id, l_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${To.table} where ${l_id}=${this[f_id]}`
            this.constructor.connection.query(query, (e, r, f) => {
                if (e) reject(e)
                else{
                    resolve(To.dto(r,false))
                }
            })
        })
    }

}

module.exports = { Relationships }