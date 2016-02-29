Feature: Homepage
  In order to use bucketlist hopepage
  As a user
  I need to be able to open the page

  Scenario: Open the page
    Given I am on "/"
    Then the response status code should be 200