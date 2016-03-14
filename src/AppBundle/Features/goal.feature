Feature: Goal page
  In order to use goal create page and check it
  As a user1
  I need to be able to check goal create page

  Background:
    Given I am logged in as "user1"

  @javascript @preview
  Scenario: Open Preview and show me the initial state of my goal
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "user1"
    When I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
#    TODO must js for video link and scroll up by class, scroll down by class is work
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".modal-bottom"
    And I follow "Cancel"
    And I wait for angular
    And I press "btn_preview"
    And I should be on "/goal/view/test-goals-1"
    Then I should see "EDIT"
    When I follow "EDIT"
    Then I should see "TEST GOALS"

  @javascript @doneGoal
  Scenario: Done a goal
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I scroll page to ".information"
    And I follow "DONE"
    Then I should be on "user-profile/completed-goals"
    When I scroll page to ".information"
    Then I should see "SUCCESS STORY"

  @javascript @manageGoal
  Scenario: Open manage and let me change whatever I want
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I scroll page to ".information"
    And I follow "MANAGE"
    And I wait for angular
    Then I should see "Goal is active"
    When I change date
  # TODO must be fixed with js
    And I fill in "loc" with "Yerevan, Armenia"
    And I fill in "app_bundle_user_goal[note]" with "Hello my friends"
    And I change priority
    And I fill in "stepText[ 0 ]" with "step 1"
    And I change switch "3"
    And I wait
    And I change switch "3"
    And I press "Save"
    Then I should see "user1 useryan"
    When I scroll page to ".information"
    And I follow "MANAGE"
    And I wait for angular
    When I change switch "0"
    Then I should see "Goal is completed"
    And I click on "btn btn-purple button-lg"
    Then I should see "user1 useryan"

  @javascript @shareGoal
  Scenario: Share a goal
    Given I am on "/ideas"
    When I wait for angular
    And I click on "atc_s addthis_button_compact"
    And I wait
    And I switch to iframe "#at3winshare-iframe"
    And I click on "at3winsvc_facebook"
#    TODO need js for correct wait
    And I wait
    And I switch to window
    And I wait
    And I fill in "email" with "test@test.am"
    And I fill in "pass" with "test1234567"
    And I press "login"

  @javascript @goalDraft
  Scenario: Open My Bucket list and show me the list of my drafts
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I follow "Drafts"
    Then I should be on "/goal/drafts"
    And I should see "EDIT"
    And I should see "DELETE"
    When I follow "EDIT"
    Then I should see "Suggest as public"
    When I move backward one page
    And I follow "DELETE"
    And I wait for angular
    Then I should see "You are about to delete your draft goal. Are you sure?"
    When I follow "Delete"
    Then I should be on "goal/drafts"
    And I should see "Drafts"
    When I follow "DELETE"
    And I wait for angular
    And I follow "Cancel"
    Then I should not see "You are about to delete your draft goal. Are you sure?"


  @javascript @goalActiveCompleted
  Scenario: Open My Bucket list and check Active/Completed filter for empty/no-empty goal
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should see "goal4"
    When I follow "Active"
    Then I should see "goal3"
    When I follow "Completed"
    Then I should see "goal4"
    And I should see "Dreaming"
    And I wait
    When I am on "/logout"
    And I am logged in as "user2"
    Then I should see "user2 useryan"
    When I am on "/user-profile"
    Then I should see "What are you doing here? Come on, add some goals"
    When I follow "Active"
    Then I should see "Your life needs goals, add some more"
    When I follow "Completed"
    Then I should see "It’s time to act and complete some goals"


  @javascript @goalCreatePage
  Scenario: Open the page and show all the features
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    And I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR #BEHAT TEST #GOALS"
#    TODO must be fixed for add vidoe link
#    And I fill in "app_bundle_goal[videoLink][ 0 ]" with "www.google.com"
    And I wait for angular
    And I press "btn_publish"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I click on "btn btn-transparent button-lg"


#  @javascript @removeGoal
#  Scenario: Create goal
#    When I follow "user2"
#    And I follow "Create Goal"
#    Then I should see "Suggest as public"
#    When I fill in "app_bundle_goal[title]" with "BEHAT TEST GOALS"
#    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
#    And I wait for angular
#    And I click on goal create
#    And I wait for angular
#    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
#    And I follow "FORGET IT"
#    And  I follow "DELETE"
#    Then I should be on "user-profile"
#


#  Scenario: Create draft
#    Given I am on "/goal/create"
#    Then I should see "Suggest as public"
#    When I fill in "app_bundle_goal[title]" with "BEHAT TEST GOALS"
#    When I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
#    When I wait for angular
#    When I press "PREVIEW"
#    Then I should see "EDIT"
#    And I should be on "/goal/view/behat-test-goals-1"
