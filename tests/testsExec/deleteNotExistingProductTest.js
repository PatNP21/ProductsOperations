const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let name, response
Given('name of not existing product', function() {
    name = 'IHaveNeverExist'
    return name
})

When('we are deleting not existing product', async function() {
    response = await axios.delete(`http://localhost:2001/products/${name}`)
})

Then('we should receive the information about not existing product', function() {
    assert.ok("The product had not existed.")
})
