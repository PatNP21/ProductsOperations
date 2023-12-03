const ProductModel = require("./ProductModel")
const mongoose = require('mongoose') 


class Repository {

    constructor() {}

    db = mongoose.connection
    products = this.db.collection('products')

    result

    //WORKS!!
    async getAllProducts() {
        this.result = await this.products.find({}).toArray()
        if(this.result == []) {
            return 'The collection is empty.'
        } else {
            return this.result
        }
    }

    //WORKS!!
    async getProductByName(name) {
        this.result = await this.products.findOne({name: name})
        if(this.result === null) {
            return 'The product does not exist.'
        } else {
            return this.result
        }
    }

    //WORKS!!
    async createProduct(data) {
        let newProduct = new ProductModel(data)
        try {
            this.result = await this.products.insertOne({
                name: data.name,
                createdAt: new Date(),
                current: {...newProduct._doc},
                prev: []
            })
            if(this.result) {
                return this.result.insertedId
            } else {
                return 'Error occured!'
            }
        }
        catch(err) {
            return "Error occured!"
        }

    }

    async updateProduct(name, data) {
        let updatedProduct = new ProductModel(data)
        if(updatedProduct.availableAmount === 0) {
            updatedProduct.isAvailable = false
        }
        this.getProductByName(name).then(async (res) => {
            console.log(res)
            this.products.findOneAndUpdate(
                {name: name}, 
                {$push: {prev: res.current}} 
            )

            this.result = await this.products.updateOne(
                {name: name}, 
                {$set: {current: {...updatedProduct._doc}}}
            )
            if(this.result && this.result.modifiedCount === 1) {
                return "Product updated"
            } else {
                return 'Error occured!'
            }
        }).catch(err => {
            return "Error occured."
        })
        
    }

    async deleteProduct(name) {
        try {
            this.result = await this.products.findOneAndDelete(
                { name: name }
            )
            if(this.result === null) {
                return "The product had not existed."
            } else {
                return this.result
            }
        } catch(err) {
            return "It is impossible to remove the product"
        }
    }
}

module.exports = Repository