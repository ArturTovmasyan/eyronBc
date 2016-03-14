Feature: Settings
  In order to change my info
  As a user2
  I need to be able to open the page and change the info I want


  Background:
    Given I am logged in as "user2"

  @javascript @settings
  Scenario: Open pop up and show me the info I filled in registration
    When I follow "user2"
    And I follow "Settings"
    And I wait for angular
    Then I should see "user2@user.com"
    When I fill in the following:
      | bl_user_settings_firstName | user3 |
      | bl_user_settings_lastName | user3 |
      | bl_user_settings_addEmail | test8@test.am |
      | bl_user_settings_currentPassword | Test1234 |
      | bl_user_settings_plainPassword_first | test1234 |
      | bl_user_settings_plainPassword_second | test1234 |
    And I select date fields
    And I select language
    And I wait
    And I click on "btn btn-purple button-lg"
    And I wait for angular
    Then I should be on "/ideas"
    When I wait for angular
    And I follow "user3"
    And I follow "Настройки"
    And I wait for angular
    And I select language
    And I click on "btn btn-purple button-lg"
    And I wait for angular
    Then I should not see "Primary Email"




