Feature: Login
  In order to use login functionality
  As an anonymous user
  I need to be able to check login functionality

  @login @javascript
  Scenario: Login user
    Given I am on "/"
    When I follow "JOIN"
    When I wait for angular
    And I set fields data
    And I press "SIGN IN"
    Then I should see "MOST POPULAR"

  Scenario: Login with bad credentials
    Given I am on "/login"
    When I fill in the following:
      | _username | bar@foo.com |
      | _password | bar         |
    And I press "SIGN IN"
    Then I should be on "/login"
    And I should see "The email and password you entered did not match our records. Please try again."

  Scenario: Log in admin user
    Given I am on "/login"
    When I fill in the following:
      | _username | admin@admin.com |
      | _password | Test1234         |
    And I press "SIGN IN"
    Then I should be on "/admin/dashboard"
    And I should see "Homepage"
