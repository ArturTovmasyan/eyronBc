Feature: Homepage
  In order to use bucketlist homepage
  As a user
  I need to be able to open the page

  @javascript @homepage
  Scenario: Open the page
    Given I am on "/"
    Then I should see "Have your list of goals for life and see how much more you would achieve over what you could possibly imagine."
