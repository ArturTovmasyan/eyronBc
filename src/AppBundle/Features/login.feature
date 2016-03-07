Feature: Login
  In order to use login functionality
  As an anonymous user
  I need to be able to check login functionality

  @login @javascript
  Scenario: Login user
    Given I am on "/"
    When I wait for angular
    When I follow "JOIN"
    And I set fields data
    Then I should see "MOST POPULAR"

    @javascript @loginError
  Scenario: Login with bad credentials
    Given I am on "/"
#    When I fill in the following:
#      | _username | bar@foo.com |
#      | _password | bar         |
      When I wait for angular
      When I follow "JOIN"
    And I set fields data
    Then I should be on "/"
    And I should see "The email and password you entered did not match our records. Please try again."

  Scenario: Log in admin user
    Given I am on "/login"
    When I fill in the following:
      | _username | admin@admin.com |
      | _password | Test1234         |
    And I press "SIGN IN"
    Then I should be on "/admin/dashboard"
    And I should see "Homepage"
