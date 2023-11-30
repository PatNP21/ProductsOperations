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
        return OrderModel.find()
    }

    async getOrderById(id) {
        return OrderModel.findById(id)
    }

    async createOrder(data) {
        let newOrder = new OrderModel(data)
        ProductModel.findById(data.product).then( (res) => {
            if(res._id == data.product) {
                ProductModel.findOneAndUpdate({_id: data.product}, {$set: {availableAmount: (Number(res.availableAmount) - Number(data.amount))}})
                .then(updatedProduct => {
                    if(Number(updatedProduct.availableAmount) >= 0) {
                        try {
                            newOrder.save(data)
                            return {"addedRecord": data}
                        } catch(err) {
                            return {"message": "Error occured during creating the order."}
                        }
                    } else {
                        throw new Error('Available amount of the product is not enough to man this order.')
                    }
                }).catch(() => {
                    throw new Error('Problem occured.')
                }) 
            } else {
                throw new Error('The mentioned product does not exist.')
            }
            
        })       
    }
}

module.exports = Repository