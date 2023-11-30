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
        minValue: 0
    },
    price: {
        type: Number,
        minValue: 0,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
})

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel