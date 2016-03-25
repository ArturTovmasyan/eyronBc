Feature: Idea
  In order to use Idea page
  As a anonymous
  I need to be able to see ideas page and search

  @javascript @ideas
  Scenario: Open Ideas page and show list of ideas
    Given I am on "/ideas"
    Then I should see "Explore over thousand great ideas"
    And I should not see "Sorry, we couldn't find anything, but you can explore other ideas:"
    And I should see "LISTED BY"
    And I should see "COMPLETED BY"
    When I follow "MAP"
    And I wait for angular
    And I press "Most popular"
    Then I should see categories
    When I follow "Experience"
    Then I should be on "/ideas/experience"
    Then I should see "Experience"
    And I should see "LISTED BY"
    And I should see "COMPLETED BY"

  @javascript @linkInIdeasPage
  Scenario: Open ideas page and check Add, Done, Share links
    Given I am on "/ideas"
    And I should see "Explore over thousand great ideas"
    And I wait for view
    And I click on "addthis_button_compact"
    And I wait for angular
    And I follow "Close"
    And I wait for angular
    And I follow "Add"
    And I wait for angular
    Then I should see "SIGN IN"
    When I follow "JOIN"
    And I follow "DONE"
    And I wait for angular
    Then I should see "SIGN IN"

