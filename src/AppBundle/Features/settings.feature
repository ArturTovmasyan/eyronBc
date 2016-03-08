Feature: Settings page
  In order to use settings page and check it
  As a user
  I need to be able to check settings page

  Background:
    Given I am logged in

  @javascript @settings
  Scenario: Open settings page
    When I follow "user2"
    And I follow "Settings"
    And I wait for angular
    Then I should see "Save"
    And I press "Save"
    Then I should be on "/ideas"




