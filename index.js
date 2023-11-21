const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const ProductRoutes = require('./routes/Router.js')

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect((process.env.DATABASEURL).toString())
const DbInstance = mongoose.connection

DbInstance.on('error', console.error.bind(console, 'connection error: '))
DbInstance.once('open', () => {
    console.log("Connected with database.")
})

exports.test = function(req,res) {
    res.render('test')
}

app.get("/", (req, res) => {
    res.send("123")
})
//using product routes
app.use("/products", ProductRoutes)

const Port = process.env.PORT || 1000 
app.listen(Port, () => {
    console.log(`Server ${Port}`)
})