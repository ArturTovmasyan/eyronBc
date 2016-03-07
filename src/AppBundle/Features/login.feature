Feature: Login
  In order to use login functionality
  As an anonymous user
  I need to be able to check login functionality

  @javascript
  Scenario: Login user
    Given I am on "/"
    When I wait for angular
    When I follow "JOIN"
    And I find "_username" and set "user@user.com"
    And I find "_password" and set "Test1234"
    And I find and press button in login
    Then I should see "MOST POPULAR"


  @javascript
  Scenario: Login with bad credentials
    Given I am on "/"
      When I wait for angular
      When I follow "JOIN"
      And I find "_username" and set "test@grno.am"
      And I find "_password" and set "test12asasa34"
      And I find and press button in login
      And I wait for angular
      Then I should be on "/"
      And I should see "The email and password you entered did not match our records. Please try again."

  @javascript
  Scenario: Log in admin user
    Given I am on "/"
    When I wait for angular
    When I follow "JOIN"
    And I find "_username" and set "admin@admin.com"
    And I find "_password" and set "Test1234"
    And I find and press button in login
    Then I should be on "/admin/dashboard"
    And I should see "Homepage"
