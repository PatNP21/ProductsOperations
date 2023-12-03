const Controller = require('./Controller.js') 
const validator = require('../validator/validator.js')
const express = require('express') 

const router = express.Router()

const controller = new Controller()

router.route("/products")
    .get(
        controller.getProducts
    )
    .post( 
        validator.create,
        controller.addProduct
    )
    
router.route("/products/:product")
    .get(
        controller.getProductByName
    )
    .put(
        validator.update,
        controller.updateProduct
    )
    .delete(
        validator.remove,
        controller.deleteProduct
    )

module.exports = router



