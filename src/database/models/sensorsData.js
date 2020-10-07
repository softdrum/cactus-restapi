const mongoose = require('mongoose');
const { Schema } = require('mongoose')
const DAY = 60*60*24;

const sensorsData = new Schema({
    nodeId: Number,
    data: Array,
    createdAt: { type: Date, expires: DAY }
})

sensorsData.pre('validate', function (next) {
  let now = Date.now()
  this.createdAt = now
  // Call the next function in the pre-save chain
  next()    
})

module.exports = mongoose.model('sensorsData', sensorsData)
