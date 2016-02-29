Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user
  I need to be able to check my bucket list page

  Scenario: Open my bucket list page
    Given I am on "/user-profile"
    Then the response status code should be 200


