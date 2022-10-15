const mongoose = require('mongoose')

// Make a Schema
const vegetablesSchema = new mongoose.Schema({
    name: { type: String, require: true },
    color: { type: String, required: true },
    readyToEat: Boolean
})


// Make a Model from the Schema

const Vegetables = mongoose.model('Vegetables', vegetablesSchema)

// Export the Model for Use in the App

module.exports = Vegetables