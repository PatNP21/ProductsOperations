const ProductModel = require("./ProductModel")

class Repository {

    constructor() {}

    async getAllProducts() {
        return ProductModel.find()
    }

    async getProductById(id) {
        return ProductModel.findById(id)
    }

    async createProduct(data) {
        return ProductModel.insertOne(data)
    }

    async updateProduct(id, data) {
        return ProductModel.findByIdAndUpdate(
            { _id: id }, 
            { $set: {name: data.name, revision: data.revision} }   
        )
    }

    async deleteProduct(id) {
        return ProductModel.findByIdAndDelete(
            { _id: id }
        )
    }
}

module.exports = Repository