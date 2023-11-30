const Controller = require('./Controller.js') 
const express = require('express') 

const router = express.Router()

const controller = new Controller()

router.route("/products")
    .get(
        controller.getProducts
    )
    .post( 
        controller.addProduct
    )
    
router.route("/products/:product")
    .get(
        controller.getProductByName
    )
    .put(
        controller.updateProduct
    )
    .delete(
        controller.deleteProduct
    )

router.route("/orders")
    .get( 
        controller.getOrders
    )
    .post(
        controller.addOrder
    )

router.route("/orders/:id")
    .get(
        controller.getOrderById
    )
    .put(
        controller.updateOrder
    )
    .delete(
        controller.deleteOrder
    )

module.exports = router



