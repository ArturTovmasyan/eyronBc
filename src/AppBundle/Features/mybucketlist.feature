Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user1
  I need to be able to check my bucket list page

  @javascript @profile
  Scenario: Open Complete profile dropdown and show me the 7 points in it
    Given I am on "/logout"
    And I wait
    When I am logged in as "user1"
    And I am on "/activity"
    And I click on "text-gray"
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
    Given I am on "/logout"
    And I wait
    When I am logged in as "user1"
    And I follow "user1"
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
    And I wait for angular
    Then I should see "Satellite"

  @javascript @subfilters
  Scenario: Open subfilters:dreams, important, urgent.......
    Given I am on "/logout"
    And I wait
    When I am logged in as "user1"

    And I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"

    When I check subfilters "0"
    And I wait

    When I check subfilters "0"
    And I wait
    And I check subfilters "1"
    And I wait
    Then I should see "goal6"

    When I check subfilters "1"
    And I wait
    And I check subfilters "2"
    And I wait
    Then I should see "goal4"

    When I check subfilters "2"
    And I wait
    And I check subfilters "3"
    And I wait
    Then I should see "goal3"

    When I check subfilters "3"
    And I wait
    And I check subfilters "4"
    And I wait
    Then I should see "goal6"

    When I check subfilters "4"
    And I wait

  @javascript @subfiltersEmpty
  Scenario: Open subfilters when not goal:dreams, important, urgent.......
    Given I am on "/logout"
    And I wait
    When I am logged in as "user2"

    And I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"

    When I check subfilters "0"
    And I wait
    Then I should see "No deadline, No goal! You are just dreaming "

    When I check subfilters "0"
    And I wait
    And I check subfilters "1"
    And I wait
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "1"
    And I wait
    And I check subfilters "2"
    And I wait
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "2"
    And I wait
    And I check subfilters "3"
    And I wait
    Then I should see "There are no goals to correspond to this priority combination"

    When I check subfilters "3"
    And I wait
    And I check subfilters "4"
    And I wait
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "4"
    And I wait
    Then I should see "What are you doing here? Come on, add some goals."
