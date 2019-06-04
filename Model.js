const { connection } = require('./nodeorm')

class Model{

    constructor(){
        this.connection = connection;
        this.selectArr = []
        this.whereArr = []
    }

    get(){
    	return new Promise((resolve,reject)=>{
    		let query = 'select '
    		if(this.selectArr.length > 0){
    			query += this.selectArr.join(',')
    		}else{
    			query += '*'
    		}
    		query += ' from ' + this.table + ' '
    		if(this.whereArr.length > 0){
    			this.whereArr.forEach(element=>{
    				query += element
    			})
    		}
    		this.executeQuery()
    	})
    }

    executeQuery(query){
    	new Promise((resolve,reject)=>{

		})
    }

    where(column,condition,value){
    	this.whereArr.push({
    		'column': column,
    		'condition': condition,
    		'value': value
    	})
    }
}

module.exports = { Model }
