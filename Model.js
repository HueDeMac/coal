const { connection } = require('./nodeorm');

class Model {

	static table = ''
	static connection = connection;

	static find(id) {
		return new Promise((resolve, reject) => {
			this.connection.query('SELECT * FROM ' + this.table + ' where id=' + id, (err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res)
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
					const outputArray = []
					res.forEach(item => {
						const obj = new this
						for (const prop in item) {
							obj[prop] = item[prop]
						}
						outputArray.push(obj)
					})

					resolve(outputArray)
				}
			})
		})
	}

	save() {
		if (this.id) {
			this.constructor.connection.query('UPDATE ' + this.constructor.table + ' SET ? where id=' + this.id,this)
		} else {
			this.constructor.connection.query('INSERT INTO ' + this.constructor.table + ' SET ?', this, (e, r, f) => {
				if(e) throw e
				else 
				this.id = r.insertId
			})
		}
	}

	static create(inputs) {
		return new Promise((resolve, reject) => {
			const qry = 'INSERT INTO ' + this.table + ' SET ?'
			this.connection.query(qry, inputs, (e, r, f) => {
				if (e) {
					reject(e)
				} else {
					const obj = new this
					for (let p in inputs) {
						obj[p] = inputs[p]
					}
					obj.id = r.insertId
					resolve(obj)
				}
			})
		})
	}
}

module.exports = { Model }
