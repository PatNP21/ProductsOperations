const {When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let response
When('we are going to products section', async function() {
    response = await axios.get('http://localhost:2000/products')
})

Then('we receive the list of all products', function() {
    return response
})