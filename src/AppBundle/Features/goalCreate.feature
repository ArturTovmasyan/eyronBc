Feature: Goal create
  In order to use goal create page and check it
  As a user
  I need to be able to check goal create page

  @goal
  Scenario: Open goal create page
    When I am logged in
#    And I wait for angular
    Given I am on "/goal/create"
    Then I should see "Suggest as public"
    And the response status code should be 200


