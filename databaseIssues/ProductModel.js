const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    revision: {
        type: String,
        required: true
    },
    class: {
        type: String
    },
    availableAmount: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }

})

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel