const { connection } = require('../nodeorm')

class Collection extends Array {

    size() {
        return this.length
    }

    avg() {
        return this.sum() / this.size()
    }

    sum() {
        return this.reduce(function (sum, item) {
            return sum + item
        })
    }

    first() {
        return this.length > 1 ? this[0] : null
    }

    last() {
        return this.length > 1 ? this[this.length - 1] : null
    }

}

module.exports = { Collection }