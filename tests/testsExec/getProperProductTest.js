const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let name, response
Given('we need to get details for proper name of the product', function() {
    return name
})

When('we are get the proper product with more details', async function() {
    response = await axios.get(`http://localhost:2000/products/${name}`)
})

Then('we receive the details for chosen product', function() {
    assert.equal(response.data.name, name)
})