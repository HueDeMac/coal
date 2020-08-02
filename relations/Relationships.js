class Relationships {

    hasOne(From, To, f_id, l_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${To.table} where ${f_id}=${this[l_id]}`
            this.constructor.connection.query(query, (e, r, f) => {
                if (e) reject(e)
                else{
                    resolve(To.dto(r,false))
                }
            })
        })
    }

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

    belongsToMany(From, To, From_f_id, To_f_id, pivot_table, f_id = "id", t_id = "id") {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${To.table} where ${t_id} IN ( select ${To_f_id}  from ${ pivot_table } where ${From_f_id} = ${this[f_id]} )`
            this.constructor.connection.query(query, (e, r, f) => {
                if (e) reject(e)
                else{
                    resolve(To.dto(r))
                }
            })
        })
    }


}

module.exports = { Relationships }