const { connection } = require('./nodeorm');
const { isNullOrUndefined, isArray, isNull } = require('util');
const { Relationships } = require('./relations/Relationships')
const { Collection } = require('./utilities/Collection')


class Model extends Relationships {


    static table = ''
    static connection = connection;
    static items = []
    static conditions = []
    static selections = []

    static find(ids) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT ' + this.getSelects() + ' FROM ' + this.table
            if (Array.isArray(ids)) {
                query += ' where id in (' + ids.join(',') + ')'
            } else {
                query += ' where id=' + ids
            }
            this.connection.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.dto(res, false))
                }
            })
        })
    }

    static select(keyArray) {
        if (Array.isArray(keyArray)) {
            this.selections = keyArray
        } else {
            this.selections.push(keyArray)
        }
        return this
    }

    static where(key, operator, value) {
        let op = '='
        if (!isNullOrUndefined(value)) {
            op = operator
            this.conditions.push({
                key: key,
                operator: op,
                value: value
            })
        } else {
            this.conditions.push({
                key: key,
                operator: op,
                value: operator
            })
        }

        return this
    }

    static get() {
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql(), (e, r, f) => {
                if (e) reject(e)
                else {
                    const data = this.dto(r)
                    isNull(data) ? resolve([]) : resolve(data)
                }
            })
        })
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ' + this.table, (err, res, fld) => {
                if (err) {
                    reject(err)
                } else {
                    const data = this.dto(res)
                    isNull(data) ? resolve([]) : resolve(data)
                }
            })
        })
    }

    save() {
        return new Promise((resolve, reject) => {
            if (this.id) {
                this.constructor.connection.query('UPDATE ' + this.constructor.table + ' SET ? where id=' + this.id, this, (e, r) => {
                    if (e) reject(e)
                    else resolve(r)
                })
            } else {
                this.constructor.connection.query('INSERT INTO ' + this.constructor.table + ' SET ?', this, (e, r, f) => {
                    if (e) reject(e)
                    else {
                        this.id = r.insertId
                        resolve(r)
                    }
                })
            }
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            if (this.id) {
                const query = 'DELETE from ' + this.constructor.table + ' where id=' + this.id
                this.constructor.connection.query(query, (e, r, f) => {
                    if (e) reject(e)
                    else resolve(r)
                })
            }
        })
    }

    static create(inputs) {
        return new Promise((resolve, reject) => {
            const qry = 'INSERT INTO ' + this.table + ' SET ?'
            this.connection.query(qry, inputs, (e, r, f) => {
                if (e) {
                    reject(e)
                } else {
                    const obj = this.dto([inputs], false)
                    obj.id = r.insertId
                    resolve(obj)
                }
            })
        })
    }

    static getWheres() {
        let str = ''

        if (this.conditions.length > 0) {
            this.conditions.forEach(item => {
                let value = item.value
                if (isNaN(item.value)) {
                    value = '"' + item.value + '"'
                }
                if (str.length === 0) {
                    str += ' where ' + item.key + item.operator + value
                } else {
                    str += ' AND ' + item.key + item.operator + value
                }
            })
        }
        return str
    }

    static getSelects() {
        let str = ''
        if (this.selections.length > 0) {
            str = ' ' + this.selections.join(',') + ' '
        } else {
            str = ' * '
        }
        return str
    }

    static sql() {
        return 'select ' + this.getSelects() + ' from ' + this.table + ' ' + this.getWheres()
    }

    static dto(res, returnArray = true) {
        if (Array.isArray(res) && res.length > 0) {
            const collect = new Collection()
            res.forEach(item => {
                let obj = new this
                Object.assign(obj, item)
                collect.push(obj)
            })
            return returnArray ? collect : collect.first()
        } else {
            return null
        }
    }
}

module.exports = { Model }
