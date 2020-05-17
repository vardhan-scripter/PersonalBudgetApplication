const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = Item = mongoose.model('items',ItemSchema);