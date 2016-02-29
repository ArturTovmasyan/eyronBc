Feature: Ideas
  In order to use ideas page and check it
  As a user
  I need to be able to check ideas page

  Scenario: Open the ideas page
    Given I am on "/ideas"
    Then the response status code should be 200
    And I should see "Explore over thousand great ideas"


