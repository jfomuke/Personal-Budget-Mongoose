const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema
({
    id: 
    {
            // Constraints
            type: Number,
            required: true,
            unique: true
    },
    title: 
    {
            // Constraints
            type: String,
            required: true,
            trim: true,
            uppercase: true
    },
    budget: 
    {
            type: Number,
            required: true
    },
    color: 
    {
            type: String,
            required: true,
            // Needs to be 7, 6 wont cuz of # symbol...... so many errors
            minlength: 7,
            maxlength: 7

    }

}, { collection: 'budgetStuff'})

// Make the schema into a model
module.exports = mongoose.model('budgetStuff', budgetSchema)