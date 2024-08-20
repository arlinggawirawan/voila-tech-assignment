Feature: Make 1 transaction from login to checkout

  Scenario: Purchase a product with specification price below IDR 10,000,000 and not in the BAG or WATCH category
    Given I am logged into the application
    When I add a product to the cart with a price below IDR 10,000,000 that is not in category BAG or WATCH
    And I proceed to checkout
    And I input my shipping address as "Arlingga-Candidate QA"
    And I choose the courier
    And I choose "midtrans" as the payment method
    Then I should see the correct transaction amount