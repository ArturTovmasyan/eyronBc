Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user1
  I need to be able to check my bucket list page

  Background:
    Given I am logged in as "user1"

  @javascript @profile
  Scenario: Open Complete profile dropdown and show me the 7 points in it
    Given I am on "/activity"
    When I click on "text-gray"
    And I wait for angular
    And I follow "Upload an image"
    And I wait for angular
    And I follow "Cancel"
    And I wait for angular
    And I follow "Add some goals."
    Then I should be on "/goal/create"
    And I should see "user1"

  @javascript @myBucketList
  Scenario: Open My BucketList and show me my all goals
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should see "Active"
    And I should see "user1 useryan"
    And I should see "Listed"
    And I should see "Completed"
    When I click on "icon-settings"
    And I wait for angular
    And I click on "btn btn-transparent button-lg"
    And I wait for angular
    And I follow "Map"
    And I wait
    Then I should see "Satellite"
#TODO must be added pagination part

