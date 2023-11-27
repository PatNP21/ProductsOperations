const ProductModel = require("./ProductModel")
const OrderModel = require("./OrderModel")

class Repository {

    constructor() {}

    changeStream

    //PRODUCTS

    async getAllProducts() {
        return ProductModel.find()
    }

    async getProductByName(name) {
        return ProductModel.find({name: name})
    }

    async createProduct(data) {
        let newProduct = new ProductModel(data)
        return newProduct.save(data)
    }

    async updateProduct(name, data) {
        let updatedProduct = ProductModel.findOneAndUpdate(
            { name: name }, 
            { $set: {revision: data.revision, class: data.class, availableAmount: data.availableAmount, updatedOn: new Date()} }   
        )
        return updatedProduct
    }

    async deleteProduct(name) {
        let deletedProduct =  ProductModel.findOneAndDelete(
            { name: name }
        )
        return {"message": `The product ${name} has been deleted.`}
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

    /*async updateOrder(id, data) {
        let updatedOrder = OrderModel.findByIdAndUpdate(
            { _id: id }
            
    }*/

    async deleteOrder(id) {
        let deletedOrder =  OrderModel.findByIdAndDelete(
            { _id: id }
        )
        return deletedOrder
    }
}

module.exports = Repository