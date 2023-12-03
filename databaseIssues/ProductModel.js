const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    revision: {
        type: String,
        required: true
    },
    class: {
        type: String
    },
    availableAmount: {
        type: Number,
        required: true,
        minimum: [0, 'The amount cannot be lower than 0.']
    },
    price: {
        type: Number,
        minimum: [0, 'The price cannot be lower than 0.'],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    updatedOn: {
        type: Date,
        default: new Date()
    },
    v: {
        type: Number
    }
})

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel