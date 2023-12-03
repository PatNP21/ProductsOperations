const {When, Then} = require('cucumber')
const assert = require('assert')
const axios = require('axios')

let resp
When('we are going to products section', async function() {
   resp = await axios.get('http://localhost:2001/products')
   return resp
})

Then('we receive the list of all products', function() {
    assert.ok(resp.data[0]._id)
    assert.ok(resp.data[0].name)
    assert.ok(resp.data[0].current)
    assert.ok(resp.data.length >= 1)
})