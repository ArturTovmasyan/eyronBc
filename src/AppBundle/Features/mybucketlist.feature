Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user
  I need to be able to check my bucket list page

  Background:
    Given I am logged in as "user1"


  @javascript @profile
  Scenario: Open Complete profile dropdown and show me the 7 points in it
    Given I am on "/activity"
    When I click on icon "text-gray"
    And I wait for angular
    And I follow "Upload an image"
    And I wait for angular
    And I follow "Cancel"
    And I wait for angular
    And I follow "Add some goals."
    Then I should be on "/goal/create"
    And I should see "user1"


