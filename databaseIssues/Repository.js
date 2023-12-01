const ProductModel = require("./ProductModel")
const OrderModel = require("./OrderModel")
const mongoose = require('mongoose') 


class Repository {

    constructor() {}

    db = mongoose.connection
    products = this.db.collection('products')
    orders = this.db.collection('orders')

    //PRODUCTS

    //WORKS!!
    async getAllProducts() {
        return this.products.find({}).toArray()
    }

    //WORKS!!
    async getProductByName(name) {
        return this.products.findOne({name: name})
    }

    //WORKS!!
    async createProduct(data) {
        let newProduct = new ProductModel(data)
        try {
            return this.products.insertOne({
                name: data.name,
                createdAt: new Date(),
                current: {v: 1, ...newProduct._doc},
                prev: []
            })
        }
        catch(err) {
            return "Error occured!"
        }

    }

    async updateProduct(name, data) {
        let updatedProduct = new ProductModel(data) 
        this.getProductByName(name).then(res => {
            console.log(res)
            this.products.findOneAndUpdate(
                {name: name}, 
                {$push: {prev: res.current}} 
            )
            this.products.updateOne(
                {name: name}, 
                {$set: {current: {v: res.current.v += 1, ...updatedProduct._doc}}}
                
            )
            return "Record updated"
        }).catch(err => {
            return "Error occured."
        })
        
    }

    //WORKS
    async deleteProduct(name) {
        try {
            this.products.findOneAndDelete(
                { name: name }
            )
            return {"message": `The product ${name} has been deleted.`}
        } catch(err) {
            return "It is impossible to remove the product"
        }
    }

    //ORDERS

    async getAllOrders() {
        return this.orders.find({}).toArray()
    }

    async getOrderById(id) {
        return this.orders.findById(id)
    }

    async createOrder(data) {
        let newOrder = new OrderModel(data)
        this.products.findOne({name: data.product}).then( (res) => {
            console.log('point control 1')
            if(res.name == data.product) {
                console.log('point control 2')
                this.products.findOneAndUpdate({name: data.product}, {$set: {current: {availableAmount: (Number(res.current.availableAmount) - Number(data.amount))}}})
                .then(updatedProduct => {
                    console.log('point control 3')
                    console.log(updatedProduct.current)
                    if(Number(updatedProduct.current.availableAmount) >= 0) {
                        try {
                            console.log('point control 4')
                            console.log(newOrder)
                            return this.order.insertOne(newOrder)
                        } catch(err) {
                            console.log('point control 5')
                            return {"message": "Error occured during creating the order."}
                        }
                    } else {
                        console.log('point control 6')
                        return 'Available amount of the product is not enough to man this order.'
                    }
                }).catch((err) => {
                    console.log(err)
                    return 'Problem occured.'
                }) 
            } else {
                throw new Error('The mentioned product does not exist.')
            }
            
        })       
    }
}

module.exports = Repository