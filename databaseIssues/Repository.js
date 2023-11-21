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
}

module.exports = Repository