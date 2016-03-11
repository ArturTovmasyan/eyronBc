Feature: Some more features
  In order I open My Bucket list and click 2 link
  As a user
  I need to be able to open MyBucket list and click 2 link

  Background:
    Given I am logged in

  @javascript @someMore
  Scenario: Open My Bucket List and follow the instructions
    When I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"
    When I follow "Create a Goal"
    Then I should be on "/goal/create"
    When I move backward one page
    And I follow "Suggested Ideas"
    Then I should be on "/ideas"
