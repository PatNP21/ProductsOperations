const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let name, response
Given('name of the product we have just decided to remove', function() {
    return name
})

When('we are deleting the product', async function() {
    response = await axios.delete(`http://localhost:2000/products/${name}`)
})

Then('we should receive the information about deleted product', function() {
    assert.ok({"message": `The product ${name} has been deleted.`})
})
