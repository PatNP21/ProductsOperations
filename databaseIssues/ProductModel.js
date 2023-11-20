const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    revision: {
        type: String,
        required: true
    }
})

const ProductModel = mongoose.Model('Product', productSchema)
module.exports = ProductModel