const { connection } = require('../nodeorm')

class Collection {
    constructor(items = []) {
        this.items = items
    }

    size(){
        return this.items.length
    }

    reverse(){
        return this.items.reverse()
    }

    sort(type = 'asc'){
        return this.items.sort(function (a, b) {
            return type.toLowerCase() ==='asc' ? a > b ? 1:-1: b > a ? 1 : -1
        })
    }
    avg(){
        return this.items.reduce(function(sum, item){
            return sum + item
        }) / this.size()
    }

    sum(){
        return this.items.reduce(function(sum, item){
            return sum + item
        })
    }
}

module.exports = { Collection }