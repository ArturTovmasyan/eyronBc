Feature: Idea
  In order to use Idea page
  As a anonymous
  I need to be able to see ideas page and search

  @javascript @ideas
  Scenario: Open Ideas page and show list of ideas
    Given I am on "/ideas"
    Then I should see "Explore over thousand great ideas"
    And I should not see "Sorry, we couldn't find anything, but you can explore other ideas:"
    And I should see "Listed by"
    And I should see "Completed by"
    When I follow "MAP"
    And I wait for angular
    And I press "Discover"
    Then I should see categories
    When I follow "Experience"
    Then I should be on "/ideas/experience"
    Then I should see "Experience"
    And I wait for view
    And I should see "Listed by"
    And I should see "Completed by"

  @javascript @linkInIdeasPage
  Scenario: Open ideas page and check Add, Done, Share links
    Given I am on "/ideas"
    And I should see "Explore thousands of great ideas for your Bucket List"
    And I wait for view
    And I follow "Add"
    And I wait for angular
    Then I should see "SIGN IN"
    When I follow "JOIN"
    And I wait for angular
    And I follow "Done"
    And I wait for angular
    Then I should see "SIGN IN"
