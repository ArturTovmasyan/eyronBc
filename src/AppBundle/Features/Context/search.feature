Feature: Search
  In order to be able to search
  As a user
  I need to be able to see the result of the item being searched

  Scenario: Open Bucket List and show me my search result
    Given I am on "/"
    When I fill in "search" with ""
    I should see the corresponding result
    And I should see the title of the idea
    And I should see the number of people listed/completed that idea
    And I should see add/done/share features
    When there is no idea found
  I should see "Sorry, we couldn't find anything, but you can explore other ideas:"
    And I should see seven random suggested ideas.