const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderedAt: {
        type: Date,
        default: new Date()
    },
    orderedBy: {
        type: String,
        required: true
    },
    product: {
        type: String,
        ref: 'Product'
    },
    amount: {
        type: Number,
        required: true
    },
    deliveryWay: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel