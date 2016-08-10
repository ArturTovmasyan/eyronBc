Feature: Goal page
  In order to use goal create page and check it
  As a user1
  I need to be able to check goal create page

  Background:
    Given I am on "/logout"
    And I wait
    And I am logged in as "user1"

  @javascript @goalFriendSearch
  Scenario: Open goal friends page and try search friends
    When I am on "/goal-friends"
    And I wait for view "1000"
    Then I should see "user7 user7"
    And I should see "user10 user10"
    When I fill in "searchInput" with "user7 user7"
    And I am on "/goal-friends?search=user7+user7#"
    And I wait for view "2000"
    Then I should see "user7 user7"

  @javascript @goalActiveCompleted
  Scenario: Open My Bucket list and check Active/Completed filter for empty/no-empty goal
    When I click on "navbar-right"
    And I am on "/profile"
    And I wait
    Then I should see "goal9"
    When I follow "Active"
    And I wait for view "500"
    Then I should see "goal9"
    When I follow "Completed"
    And I wait for view "500"
    Then I should see "goal3"
    And I should see "Dreaming"
    And I wait for view "500"
    When I am on "/logout"
    And I wait
    And I am logged in as "user2"
    Then I should see "user2"
    When I am on "/profile"
    Then I should see "What are you doing here? Come on, add some goals"
    When I follow "Active"
    And I wait for view "1000"
    Then I should see "Your life needs goals, add some more"
    When I follow "Completed"
    And I wait for view "1000"
    Then I should see "It’s time to act and complete some goals"
    And I wait for view "500"

  @javascript @manageGoal
  Scenario: Open manage and let me change whatever I want
    When I click on "navbar-right"
    And I am on "/profile"
    When I scroll page to ".information"
    And I follow "Manage"
    And I wait for angular
    Then I should see "Goal is active"
    When I select date fields in manage goal
    And I change priority
    And I fill in "stepText[ 0 ]" with "step 1"
    And I change switch "2"
    And I wait
    And I change switch "2"
    And I follow "Save"
    Then I should see "user1"
    And I wait for angular
    When I scroll page to ".information"
    And I follow "Manage"
    And I wait for angular
    When I change switch "0"
    And I wait for view "500"
    Then I should see "Goal is completed"
    And I click on "btn btn-purple"
    Then I should see "user1"

  @javascript @preview
  Scenario: Open Preview and show me the initial state of my goal
    When I click on "navbar-right"
    And I am on "/goal/create"
    Then I should see "user1"
    When I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".modal-bottom"
    And I follow "Cancel"
    And I wait for angular
    Then I should be on "/profile"
    When I am on "/goal/create"
    And I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "PRIVATE GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT PRIVATE GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    And I follow "Save"
    And I wait for angular
    Then I should be on "/profile"

    When I am on "/goal/create"
    And I fill in "app_bundle_goal[title]" with "TEST3 GOALS3"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST3 GOALS3"

    And I scroll page to "top"
    And I press "btn_preview"
    Then I should be on "/goal/view/test3-goals3"
    And I should see "EDIT"
    And I am on "/goal/my-ideas/drafts"
    And I should see "TEST3 GOALS3"

  @javascript @createDraft
  Scenario: Create drafts
    When I click on "navbar-right"
    And I am on "/goal/create"
    Then I should see "user1"
    When I fill in "app_bundle_goal[title]" with "TEST2 GOALS2"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST2 GOALS2"
    And I scroll page to "top"
    And I press "btn_save_draft"
    And I wait for angular
    Then I should be on "/goal/my-ideas/drafts"

  @javascript @doneGoal
  Scenario: Done a goal
    When I click on "navbar-right"
    And I am on "/profile"
    When I scroll page to ".information"
    And I follow "Done"
    And I am on "profile/completed-goals"
    Then I should be on "profile/completed-goals"
    When I scroll page to ".information"
    And I wait for view "1000"
    Then I should see "SUCCESS STORY"

  @javascript @goalCreatePage
  Scenario: Open the page and show all the features
    When I click on "navbar-right"
    And I am on "/goal/create"
    Then I should see "Suggest as public"
    When I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR #BEHAT TEST #GOALS"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I follow "Cancel"


  @javascript @goalDescriptionTest
  Scenario: Open the create page and check submit without desc.field fill
    When I click on "navbar-right"
    And I am on "/goal/create"
    Then I should see "Suggest as public"
    When I click on "iCheck-helper"
    And I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I press "btn_publish"
    And I wait for angular
    Then I should not see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I wait for view "500"

@javascript @addGoal
  Scenario: Add a goal
    Given I am on "/goal/goal1"
    And I wait
#    And I click on "icon-plus-icon"
    And I follow "ADD"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    And I should see "If you accomplished your Goal, just mark it"
    And I change switch "0"
    And I wait
    Then I should see "If you believe your Goal is still Active, you can undo it"
    And I wait
    And I scroll page to "top"
    And I change switch "0"
    And I select date fields in manage goal
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
    And I wait for view "500"
    And I follow "ADD"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".radio-inline"
    And I follow "Cancel"
    And I wait for angular
    And I should see "goal"
    And I should see "Added"

  @javascript @goalDraft
  Scenario: Open My Bucket list and show me the list of my drafts
    Given I am on "/profile"
    And I wait
    When I follow "My Ideas"
    Then I should be on "/goal/my-ideas"
    And I wait
    Then I should see "PRIVATE GOALS"
    When I follow "Drafts"
    Then I should be on "/goal/my-ideas/drafts"
    And I should see "Edit"
    And I should see "Delete"
    When I follow "Edit"
    Then I should see "Suggest as public"
    And I scroll page to "top"
    And I press "btn_publish"
    And I wait for view "1000"
    And I follow "Save"
    And I wait for angular
    Then I should be on "/profile"
    And I should see "Your Goal has been Successfully Published"
    When I am on "/goal/my-ideas/drafts"
    Then I should not see "TEST2 GOALS2"
    And I follow "Delete"
    And I wait for view "2000"
    Then I should see "Your goal will be permanently deleted."
    When I click on "btn btn-danger"
    Then I should be on "/goal/my-ideas/drafts"
    And I should see "Currently there are no draft goals in your draft list"

