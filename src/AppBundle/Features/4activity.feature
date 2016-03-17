Feature: Activity
  In order to see Activity page
  As a user
  I should have goals/goalfriends
  Where I see what my goalfriends have done

  @javascript @remainingActivity
  Scenario: All the remaining features in Activity page
    Given I am on "/logout"
    And I wait
    When I am logged in as "user2"
    And I am on "/goal/goal9"
    And I follow "ADD"
    And I wait for angular
    And I scroll page to "modal-bottom"
    And I change switch "2"
    And  I click on "btn btn-purple button-lg"
    And I wait for angular
    And I scroll page to ".information"
    And I click on "btn btn-transparent"
    And I wait
    And I scroll page to ".information"
    Then I should see "SUCCESS STORY"
    When I click on "btn btn-transparent ng-isolate-scope"
    And I wait for angular
    And I fill in "app_bundle_success_story_type[story]" with "STORY1"
    And I fill in "app_bundle_success_story_type[videoLink][ 0 ]" with "www.google.com"
    And I wait for view
    And I fill in "app_bundle_success_story_type_videoLink[ 1 ]" with "www.google.com"
    And I wait for view
    And I fill in "app_bundle_success_story_type_videoLink[ 2 ]" with "www.google.com"
    And I wait for view
    And I click on "btn btn-purple button-lg"
    And I wait for angular
    And I am on "/logout"
    And I wait
    And I am logged in as "user1"
    Then I should see "user1"
    And I should be on "/activity"

    When I follow "My Bucketlist"
    Then I should be on "/user-profile"
    And I should see "Active"
    And I should see "Completed"
    When I am on "/"
    And I follow "Goalfriends"
    And I wait
    Then I should see "user2 useryan"
    And I should be on "/goal-friends"
    And I scroll page to "icon-top-idea"
    And I should see "Top Ideas"
    When I follow "Top Ideas"
    Then I should be on "/ideas"
    When I scroll page to "navigation text-center"
    Then I should not see "Sorry, we couldn't find anything, but you can explore other ideas:"
    And I click on "show-more"
    And I wait

  @javascript @goalFriend
  Scenario: Show me the my goalfriends and when I click on them let me see their inner pages
    Given I am on "/logout"
    When I am logged in as "user1"
    And I should see "user1 useryan"
    When I follow "Goalfriends"
    Then I should see "user2 useryan"
    And I should see "Listed by"
    And I should see "Completed"
    When I click on "text-dark-gray"
    And I wait
    And I should see "Dreams"

  @javascript @activity
  Scenario: Open the page and show me my goal friends activities.
    Given I am on "/logout"
      When I am logged in as "user1"
      And I should see "user2 useryan"
      And I should see "goal9"
      And I should see "ADDED"
      And I wait

  @javascript @successStories
  Scenario: Show me success stories
      Given I am on "/logout"
      When I am logged in as "user1"
      And I should see "user2 useryan"
      And I am on "/goal/goal9"
      Then I should see "goal9"
      When I scroll page to ".text-dark-gray"
      Then I should see "Success stories"
      When I wait for view
      Then I should see "user2 useryan"
      And I should see "STORY1"
      And I wait for view
#      I should see "show 5+ more"


  @javascript @innerPage
  Scenario: Open idea inner page and show me the corresponding features.
    Given I am on "/logout"
    When I am logged in as "user1"
    And I should see "user2 useryan"
    And I am on "/goal/goal9"
    Then I should see "One must be a fox in order to recognize traps, and a lion to frighten off wolves."
    And I should see "goal9"
    And I should see "Map"
    When I scroll page to ".text-dark-gray"
    And I wait for view
    Then I should see "COMPLETED BY"
    And I should see "LISTED BY"
    When I am on "/done-users/goal9"
    Then I should see "user2"
    And I move backward one page
    When I am on "/listed-users/goal9"
    Then I should see "user1"
    And I should see "user2"
    When I move backward one page
     And I am on "/goal/goal2"
    Then I should not see "One must be a fox in order to recognize traps, and a lion to frighten off wolves."
    And I should not see "Map"
    When I am on "/goal/goal9"
    And I wait
    And I scroll page to ".text-dark-gray"
    And I wait for view

