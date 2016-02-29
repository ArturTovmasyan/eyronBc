Feature: Goal create
  In order to use goal create page and check it
  As a user
  I need to be able to check goal create page

  Scenario: Open goal create page
    Given I am on "/goal/create"
    Then the response status code should be 200


