const {Given, When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let data, response

Given('all required data to create new order', function() {
    data = {
        orderedBy: 'testUser',
        product: 'mushroom',
        amount: 900,
        deliverWay: 'carrier',
        street: 'Topolowa 22',
        postalCode: "31-050",
        town: 'Krakow',
        email: 'email@email.cem'
    }
    return data
})

Given('the product has been chosen', function() {
    assert.ok(data.product)
})

When('the chosen product exists', async function() {
    let searchExistingProduct = await axios.get(`http://localhost:2000/products/${data.product}`)
    assert.ok(searchExistingProduct.data[0]._id)
})

When('we are creating a new order', async function() {
    response = await axios.post('http://localhost:2000/orders', data)
    return response
})

Then('we receive proper response', function() {
    assert.ok([{"addedRecord": response.data[0]}])
})