Feature: Goal page
  In order to use goal create page and check it
  As a user1
  I need to be able to check goal create page

  Background:
    Given I am on "/logout"
    And I wait for view
    And I am logged in as "user1"

  @javascript @goalActiveCompleted
  Scenario: Open My Bucket list and check Active/Completed filter for empty/no-empty goal
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should see "goal9"
    When I follow "Active"
    Then I should see "goal9"
    When I follow "Completed"
    Then I should see "goal3"
    And I should see "Dreaming"
    And I wait
    When I am on "/logout"
    And I wait for view
    And I am logged in as "user2"
    Then I should see "user2 useryan"
    When I am on "/profile"
    Then I should see "What are you doing here? Come on, add some goals"
    When I follow "Active"
    Then I should see "Your life needs goals, add some more"
    When I follow "Completed"
    Then I should see "It’s time to act and complete some goals"

  @javascript @manageGoal
  Scenario: Open manage and let me change whatever I want
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/profile"
    When I scroll page to ".information"
    And I follow "Manage"
    And I wait for angular
    Then I should see "Goal is active"
    When I change date
#    And I fill in "app_bundle_user_goal[note]" with "Hello my friends"
    And I change priority
    And I fill in "stepText[ 0 ]" with "step 1"
    And I change switch "2"
    And I wait for view
    And I change switch "2"
    And I follow "Save"
    Then I should see "user1 useryan"
    And I wait for angular
    When I scroll page to ".information"
    And I follow "Manage"
    And I wait for angular
    When I change switch "0"
    And I wait for view
    Then I should see "Goal is completed"
    And I click on "btn btn-purple"
    Then I should see "user1 useryan"

  @javascript @preview
  Scenario: Open Preview and show me the initial state of my goal
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "user1"
    When I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    Then I should not see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".modal-bottom"
    And I follow "Cancel"
    And I wait for angular
    Then I should be on "/profile"
    When I am on "/goal/create"
    And I fill in "app_bundle_goal[title]" with "TEST3 GOALS3"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST3 GOALS3"
    And I scroll page to "top"
    And I press "btn_preview"
    Then I should be on "/goal/view/test3-goals3"
    And I should see "EDIT"

  @javascript @createDraft
  Scenario: Create drafts
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "user1"
    When I fill in "app_bundle_goal[title]" with "TEST2 GOALS2"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST2 GOALS2"
    And I scroll page to "top"
    And I press "btn_save_draft"
    And I wait for angular
    Then I should be on "/goal/my-ideas/drafts"

  @javascript @doneGoal
  Scenario: Done a goal
    When I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/profile"
    When I scroll page to ".information"
    And I follow "Done"
    And I am on "profile/completed-goals"
    Then I should be on "profile/completed-goals"
    When I scroll page to ".information"
    And I wait for view
    Then I should see "SUCCESS STORY"

    #TODO DON'T USE
#  @javascript @shareGoal
#  Scenario: Share a goal
#    Given I am on "/ideas"
#    When I wait for angular
#    And I click on "atc_s addthis_button_compact"
#    And I wait
#    And I click on "at3winsvc_facebook top-service"
##    And I switch to iframe "#at3winshare-iframe"
#    And I wait for view
#    And I switch to window
#    And I fill in "email" with "test@test.am"
#    And I fill in "pass" with "test1234567"
#    And I press "login"

  @javascript @goalCreatePage
  Scenario: Open the page and show all the features
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for view
    Then I should not see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR #BEHAT TEST #GOALS"
    And I press "btn_publish"
    And I wait for angular
    Then I should not see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I follow "Cancel"


  @javascript @goalDescriptionTest
  Scenario: Open the create page and check submit without desc.field fill
    When I follow "user1"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I press "btn_publish"
    And I wait for angular
    Then I should not see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I wait for view

@javascript @addGoal
  Scenario: Add a goal
    Given I am on "/goal/goal1"
    And I click on "icon-plus-icon"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I should see "If you accomplished your Goal, just mark it"
    And I change switch "0"
    And I wait for angular
    Then I should see "If you believe your Goal is still Active, you can undo it"
    And I wait
    When I scroll page to ".radio-inline"
    And I wait
    And I scroll page to "top"
    And I change switch "0"
    And I change date
    And I change priority
    And I fill in "stepText[ 0 ]" with "step 1"
    And I change switch "3"
    And I wait
    And I change switch "3"
    When I follow "FORGET IT"
    And  I follow "DELETE"
    And I wait
    Then I should be on "/goal/goal1"
    And I reload the page
    And I wait for view
    And I click on "icon-plus-icon"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".radio-inline"
    And I follow "Cancel"
    And I wait for angular
    And I should see "goal"
    And I should see "Added"

  @javascript @goalDraft
  Scenario: Open My Bucket list and show me the list of my drafts
    When I wait for angular
    And I follow "user1"
    And I follow "My Bucketlist"
    Then I should be on "/profile"
    When I follow "My Ideas"
    Then I should be on "/goal/my-ideas"
    When I follow "Drafts"
    Then I should be on "/goal/my-ideas/drafts"
    And I should see "Edit"
    And I should see "Delete"
    When I follow "Edit"
    Then I should see "Suggest as public"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    And I follow "Save"
    And I wait for view
    Then I should be on "/profile"
    And I should see "Your Goal has been Successfully Published"
    When I am on "/goal/my-ideas/drafts"
    Then I should not see "TEST2 GOALS2"
    And I wait
    And I follow "Delete"
    And I wait for angular
    Then I should see "Your goal will be permanently deleted."
    When I click on "btn btn-danger"
    Then I should be on "/goal/my-ideas/drafts"
    And I should see "Currently there are no draft goals in your draft list"

