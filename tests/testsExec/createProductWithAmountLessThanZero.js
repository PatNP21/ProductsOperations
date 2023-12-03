const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let data
let response
Given('all required data to create new product with amount less than zero', function() {
    data = {
        name: 'test',
        revision: 'revision',
        availableAmount: 1000
    } 
    return data
})

When('we are creating a new product with amount less than zero', async function() {
    response = await axios.post('http://localhost:2001/products', data)
    return response
})

Then('which response would we expect', function() {
    assert.ok('The amount cannot be lower than 0.')
})