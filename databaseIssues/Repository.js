const ProductModel = require("./ProductModel")
const OrderModel = require("./OrderModel")

class Repository {

    constructor() {}

    //PRODUCTS

    async getAllProducts() {
        return ProductModel.find()
    }

    async getProductById(id) {
        return ProductModel.findById(id)
    }

    async createProduct(data) {
        let newProduct = new ProductModel(data)
        return newProduct.save(data)
    }

    async updateProduct(id, data) {
        let updatedProduct = ProductModel.findByIdAndUpdate(
            { _id: id }, 
            { $set: {name: data.name, revision: data.revision, class: data.class, updatedOn: new Date()} }   
        )
        return updatedProduct
    }

    async deleteProduct(id) {
        let deletedProduct =  ProductModel.findByIdAndDelete(
            { _id: id }
        )
        return deletedProduct
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
        //let productToUpdate = ProductModel.findByIdAndUpdate({_id: id}, {$set: {availableAmount: "$availableAmount" - data.amount}})
        return newOrder.save(data)
    }

    async updateOrder(id, data) {
        let updatedOrder = OrderModel.findByIdAndUpdate(
            { _id: id }
            /*{ $set: {name: data.name, revision: data.revision, class: data.class, updatedOn: new Date()} }*/   
        )
        return updatedOrder
    }

    async deleteOrder(id) {
        let deletedOrder =  OrderModel.findByIdAndDelete(
            { _id: id }
        )
        return deletedOrder
    }
}

module.exports = Repository