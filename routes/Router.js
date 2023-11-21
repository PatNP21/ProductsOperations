const Controller = require('./Controller.js')
const express = require('express')

const router = express.Router()
const controller = new Controller()

router.route("/")
    .get(
        //checkIfProductEntityExists
        //handleValidation
        controller.getProducts
    )
    .post(
        //checkIfProductEntityExists
        //handleValidation
        controller.addProduct
    )

router.route("/:id")
    .get(
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        controller.getProductById
    )
    .put(
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        controller.updateProduct
    )
    .delete(
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        controller.deleteProduct
    )

module.exports = router



