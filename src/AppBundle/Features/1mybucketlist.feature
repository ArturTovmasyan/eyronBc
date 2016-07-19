Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user1
  I need to be able to check my bucket list page

  @javascript @myBucketList
  Scenario: Open My BucketList and show me my all goals
    Given I am on "/logout"
    And I wait for angular
    When I am logged in as "user1"
    And I follow "user1"
    And I follow "My Bucketlist"
    And I am on "/profile"
    And I wait for angular
    Then I should see "Active"
    And I should see "user1 useryan"
    And I should see "Listed"
    And I should see "Completed"
    When I click on "map-marker-new"
    And I wait for angular
    Then I should see "Satellite"

  @javascript @subfilters
  Scenario: Open subfilters:dreams, important, urgent.......
    Given I am on "/logout"
    And I wait for angular
    When I am logged in as "user1"

    And I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/profile"

    When I check subfilters "0"
    And I wait for angular

    When I check subfilters "0"
    And I wait for angular
    And I check subfilters "1"
    And I wait for angular
    Then I should see "goal9"

    When I check subfilters "1"
    And I wait for angular
    And I check subfilters "2"
    And I wait for angular
    Then I should see "goal4"

    When I check subfilters "2"
    And I wait for angular
    And I check subfilters "3"
    And I wait for angular
    Then I should see "goal3"

    When I check subfilters "3"
    And I wait for angular
    And I check subfilters "4"
    And I wait for angular
    Then I should see "goal7"

    When I check subfilters "4"
    And I wait for angular

  @javascript @subfiltersEmpty
  Scenario: Open subfilters when not goal:dreams, important, urgent.......
    Given I am on "/logout"
    And I wait for angular
    When I am logged in as "user2"

    And I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/profile"

    When I check subfilters "0"
    And I wait for angular
    Then I should see "No deadline, No goal! You are just dreaming "

    When I check subfilters "0"
    And I wait for angular
    And I check subfilters "1"
    And I wait for angular
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "1"
    And I wait for angular
    And I check subfilters "2"
    And I wait for angular
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "2"
    And I wait for angular
    And I check subfilters "3"
    And I wait for angular
    Then I should see "There are no goals to correspond to this priority combination"

    When I check subfilters "3"
    And I wait for angular
    And I check subfilters "4"
    And I wait for angular
    Then I should see "There are no goals to correspond to this priority combination "

    When I check subfilters "4"
    And I wait for angular
    Then I should see "What are you doing here? Come on, add some goals"

  @javascript @comments
  Scenario: show comments in inner page
    Given I am on "/logout"
    And I wait for angular
    When I am logged in as "user1"
    And I follow "user1"
    And I follow "My Bucketlist"
    And I am on "/goal/goal9"
    Then I should see "Comments"
    And should see "Show More"
    And I fill in "fos_comment_comment[body]" with "GOOD COMMENT"
    And I wait for view
    And I follow "Show More"
    And I wait for view
    Then I should see "Comment5"

