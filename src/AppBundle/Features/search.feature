Feature: Search
  In order to be able to search
  As a anonymous
  I need to be able to see the result of the item being searched

  @javascript @search
  Scenario: Open Bucket List and show me my search result
    Given I am on "/"
    When I fill in "search" with "goal1"
    And I press key "13"
    And I wait for angular
    Then I should see "LISTED BY"
    And I should see "COMPLETED BY"
    And I should see "ADD"
    When I fill in "search" with "TEST777"
    And I press key "13"
    And I wait for view
    Then I should see "Sorry, we couldn't find anything, but you can explore other ideas:"
