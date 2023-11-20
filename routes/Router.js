const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
const app = express()

app.route("/products")
    .get( (req, res) => {
        //checkIfProductEntityExists
        //handleValidation
        //controller.getAllProducts()
    })
    .post( (req, res) => {
        //checkIfProductEntityExists
        //handleValidation
        //controller.addProduct(req.body)
    })

app.route("/products/:id")
    .get( (req, res) => {
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        //controller.getProductById(req.params.id)
    })
    .put( (req, res) => {
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        //controller.updateProductById(req.params.id)
    } )
    .delete( (req, res) => {
        //checkIfProductEntityExists
        //checkIfProductExists
        //handleValidation
        //controller.deleteProductById(req.params.id)
    })