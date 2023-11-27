const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let data
let response
Given('all required data to create new product', function() {
    data = {
        name: 'test',
        revision: 'revision',
        availableAmount: 1000
    } 
    return data
})

When('we are creating a new product', async function() {
    response = await axios.post('http://localhost:2000/products', data)
    return response
})

Then('the response returned to us is proper', function() {
    assert.ok([{"addedRecord": response.data[0]}])
})