const Repository = require('./../databaseIssues/Repository.js')

class Controller {

    constructor() {
        this.repository = new Repository() 
        this.getProducts = this.getProducts.bind(this)
        this.getProductByName = this.getProductByName.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }

    dashboard(req, res) {
        res.json({'status': 'It simply works!'})
    }
    
    getProducts(req, res) {
        this.repository.getAllProducts().then(result => { 
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    getProductByName(req, res) {
        this.repository.getProductByName(req.params.product).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    addProduct(req, res) {
        this.repository.createProduct(req.body).then((result) => {
            res.status(201).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    updateProduct(req, res) {
        this.repository.updateProduct(req.params.product, req.body).then((result) => {
            res.status(200).json({"result": result})
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    deleteProduct(req, res) {
        this.repository.deleteProduct(req.params.product).then((result) => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Controller