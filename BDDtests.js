//import metod z moduły "cucumber" przydatnych przy testach zgodnych z BDD
const {When, Then, Given} = require('@cucumber/cucumber')
const axios = require('axios')
const assert = require('assert')

let data, response
Given('I enter the data required to create a new product', function(name, revision, qualityClass, availableAmount) {
    data = {
        name: name,
        revision: revision,
        class: qualityClass,
        availableAmount: availableAmount
    }
})

When("I add a new product to the database", async () => {
    response = axios.post('/products', data)
})

Then("I can find the added product in the database", (res) => {
    assert.equal(response, {"createdProduct": data})
})