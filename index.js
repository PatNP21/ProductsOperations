const express = require('express') 
const cors = require('cors') 
const bodyParser = require('body-parser') 
const mongoose = require('mongoose') 
const env = require('dotenv').config() 
const path = require('path') 
const ProductRoutes = require('./routes/Router.js')  

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect((process.env.DATABASEURL).toString())
const DbInstance = mongoose.connection

DbInstance.on('error', console.error.bind(console, 'connection error: '))

DbInstance.once('open', () => {
    console.log("Connected with database.")
})

app.use("/", ProductRoutes)

const Port = process.env.PORT || 2001
app.listen(Port, () => {
    console.log(`Server ${Port}`)
})