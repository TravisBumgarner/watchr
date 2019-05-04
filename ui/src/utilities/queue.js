function Queue() {
    this.data = []
}

Queue.prototype.add = function(record) {
    console.log('queue add')
    this.data.unshift(record)
}

Queue.prototype.addArray = function(records) {
    records.forEach(record => this.add(record))
}

Queue.prototype.remove = function() {
    console.log('queue remove')
    this.data.pop()
}

Queue.prototype.first = function() {
    console.log('queue data', this.data)
    return this.data[0]
}

Queue.prototype.last = function() {
    return this.data[this.data.length - 1]
}

Queue.prototype.size = function() {
    return this.data.length
}

export default Queue
