Feature: Goal page
  In order to use goal create page and check it
  As a user
  I need to be able to check goal create page

  Background:
    Given I am logged in as "user"

  @javascript @preview
  Scenario: Open Preview and show me the initial state of my goal
    When I follow "user2"
    And I follow "Create Goal"
    Then I should see "Suggest as public"
    When I fill in "app_bundle_goal[title]" with "TEST GOALS"
    And I fill in "app_bundle_goal[description]" with "DESCRIPTION FOR BEHAT TEST GOALS"
#    TODO must js for video link and scroll up by class, scroll down by class is work
#    And I fill in "app_bundle_goal_videoLink[ 0 ]" with "www.youtube.com"
    And I scroll page to "top"
    And I wait for angular
    And I press "btn_publish"
    And I wait for angular
    Then I should see "CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED"
    When I scroll page to ".modal-bottom"
    And I follow "Cancel"
    And I wait for angular
    And I press "PREVIEW"
    And I should be on "/goal/view/test-goals-1"
    Then I should see "EDIT"
    When I follow "EDIT"
    Then I should see "TEST GOALS"

  @javascript @doneGoal
  Scenario: Done a goal
    When I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I scroll page to ".information"
    And I follow "DONE"
    Then I should be on "user-profile/completed-goals"
    When I scroll page to ".information"
    Then I should see "SUCCESS STORY"

  @javascript @manageGoal
  Scenario: Manage completed goal
    When I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I scroll page to ".information"
    And I follow "MANAGE"
    Then I should see "user2 useryan"
    When I click goal switch
    And I should see "COMPLETION DATE"
    When I click goal switch
    Then I should see "If you accomplished your Goal, just mark it"
    And I press "Save"
    Then I should see "user2 useryan"


  @javascript @shareGoal
  Scenario: Share a goal
    Given I am on "/ideas"
    When I wait for angular
    And I click on icon "atc_s addthis_button_compact"
    And I wait for angular
    And I switch to iframe "#at3winshare-iframe"
    And I click on icon "at3winsvc_facebook"
#    TODO need js for correct wait
    And I wait
    And I switch to window
    And I wait
    And I fill in "email" with "test@test.am"
    And I fill in "pass" with "test1234567"
    And I press "login"
    And I wait for angular

  @javascript @goalDraft
  Scenario: Open My Bucket list and show me the list of my drafts
    When I follow "user2"
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


#  @javascript @createGoal
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
#    And I click on goal save
#    And I wait for angular
#    Then I should see "Complete your profile"
#
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
