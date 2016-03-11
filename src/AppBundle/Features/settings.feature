Feature: Settings
  In order to change my info
  As a user1
  I need to be able to open the page and change the info I want


  Background:
    Given I am logged in as "user1"

  @javascript @settings
  Scenario: Open pop up and show me the info I filled in registration
    When I follow "user1"
    And I follow "Settings"
    And I wait for angular
    Then I should see "user1@user.com"
    When I fill in the following:
      | bl_user_settings_firstName | user2 |
      | bl_user_settings_lastName | user2 |
      | bl_user_settings_addEmail | test8@test.am |
      | bl_user_settings_currentPassword | Test1234 |
      | bl_user_settings_plainPassword_first | test1234 |
      | bl_user_settings_plainPassword_second | test1234 |
    And I select settings date fields
    And I select language "Русский"
    And I scroll page to "modal-bottom"
    And I wait for angular
    And I press "Save"
    And I wait for angular
    And I follow "user2"
    And I follow "Настройки"
    And I wait for angular
    Then I should not see "add email"
    When I select language "English"
    And I wait for angular
    And I press "Сохранить"
    And I wait for angular
    Then I should not see "Primary Email"




