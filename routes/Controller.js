const Repository = require('./../databaseIssues/Repository.js')

class Controller {

    constructor() {
        this.repository = new Repository()
        this.getProducts = this.getProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }
    
    
    testFunction(req, res) {
        res.send('Returning all products, however it is only working test!')
    }

    getProducts(req, res) {
        this.repository.getAllProducts().then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    getProductById(req, res) {
        this.repository.getProductById(req.params.id).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    addProduct(req, res) {
        this.repository.createProduct(req.body).then(() => {
            res.status(201).json({"addedRecord": req.body})
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    updateProduct(req, res) {
        this.repository.updateProduct(req.params.id, req.body).then(() => {
            res.status(200).json({"updatedRecord": {"_id": req.params.id, "body": req.body}})
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    deleteProduct(req, res) {
        this.repository.deleteProduct(req.params.id).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Controller