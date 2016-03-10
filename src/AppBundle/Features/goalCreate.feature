Feature: Goal page
  In order to use goal create page and check it
  As a user
  I need to be able to check goal create page

  Background:
    Given I am logged in

  @javascript @goal
  Scenario: Open Preview and show me the initial state of my goal
    When I follow "user2"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
#    And I fill in "app_bundle_goal_videoLink[ 0 ]" with "www.youtube.com"
    And I scroll page "scrollTop"
    And I click on goal create
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page "scrollHeight"
    And I follow "Cancel"
    And I wait for angular
    And I press "PREVIEW"
    And I should be on "/goal/view/test-goals-1"
    Then I should see "EDIT"
    When I follow "EDIT"
    Then I should see "TEST GOALS"


  @javascript @createGoal
  Scenario: Create goal
    When I follow "user2"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I fill in "app_bundle_goal[title]" with "BEHAT TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
    And I wait for angular
    And I click on goal create
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I click on goal save
    And I wait for angular
    Then I should see "Complete your profile"

  @javascript @removeGoal
  Scenario: Create goal
    When I follow "user2"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I fill in "app_bundle_goal[title]" with "BEHAT TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
    And I wait for angular
    And I click on goal create
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I follow "FORGET IT"
    And  I follow "DELETE"
    Then I should be on "user-profile"

  @javascript @goalDraft
  Scenario: Create draft
    Given I am on "/goal/create"
    Then I should see "Suggest as public"
    When I fill in "app_bundle_goal[title]" with "BEHAT TEST GOALS"
    When I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
    When I wait for angular
    When I press "PREVIEW"
    Then I should see "EDIT"
    And I should be on "/goal/view/behat-test-goals-1"
