Feature: Methods maning the operations with order

    Scenario: add a new order
        Given all required data to create new order
        Given the product has been chosen
        When the chosen product exists
        When we are creating a new order
        Then we receive proper response