Feature: Methods maning the operations with product

    Scenario: add a new product
        Given all required data to create new product
        When we are creating a new product
        Then the response returned to us is proper
    
    Scenario: add a new product with amount less than zero
        Given all required data to create new product with amount less than zero
        When we are creating a new product with amount less than zero
        Then which response would we expect

    Scenario: get all products
        When we are going to products section
        Then we receive the list of all products

    Scenario: get proper product
        Given we need to get details for proper name of the product
        When we are get the proper product with more details
        Then we receive the details for chosen product

    Scenario: delete not existing product
        Given name of not existing product
        When we are deleting not existing product
        Then we should receive the information about not existing product

    Scenario: delete existing product
        Given name of the product we have just decided to remove
        When we are deleting the product
        Then we should receive the information about deleted product
