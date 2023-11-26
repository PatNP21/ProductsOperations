const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let data, response
Given('all required data to create new product', function() {
    return data
})

When('we are creating a new product', async function() {
    response = await axios.get('http://localhost:2000/products')
})

Then('the response returned to us is proper', function() {
    return response
})