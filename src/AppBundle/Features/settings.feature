Feature: Settings
  In order to change my info
  As a user2
  I need to be able to open the page and change the info I want


  Background:
    Given I am on "/logout"
    And I wait
    And I am logged in as "user2"

  @javascript @settings
  Scenario: Open pop up and show me the info I filled in registration
    When I follow "user2"
    And I follow "Settings"
    And I wait for angular
    Then I should see "user2@user.com"
    When I attache profile image
    And I fill in the following:
      | bl_user_settings_firstName | user3 |
      | bl_user_settings_lastName | user3 |
      | bl_user_settings_addEmail | test8@test.am |
      | bl_user_settings_currentPassword | Test1234 |
      | bl_user_settings_plainPassword_first | test1234 |
      | bl_user_settings_plainPassword_second | test1234 |
    And I select date fields
    And I select language
    And I click on "btn btn-purple button-lg"
    And I wait for angular
    Then I should be on "/activity"
    When I wait for angular
    And I follow "user3"
    And I follow "Настройки"
    And I wait for angular
    And I fill in "bl_user_settings_firstName" with "user2"
    And I fill in "bl_user_settings_lastName" with "useryan"
    And I fill in "bl_user_settings_currentPassword" with "test1234"
    And I fill in "bl_user_settings_plainPassword_first" with "Test1234"
    And I fill in "bl_user_settings_plainPassword_second" with "Test1234"
    And I select language
    And I click on "btn btn-purple button-lg"
    And I wait for angular
    Then I should not see "Primary Email"




