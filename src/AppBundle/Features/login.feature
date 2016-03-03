Feature: Login user
  In order to use login user
  As an anonymous user
  I need to be able to login user

#  @javascript
#  Scenario: Registration
#    Given I am on "/register/"
#    When I fill in the following:
#      | fos_user_registration_form[firstName]             | Art |
#      | fos_user_registration_form[lastName]              | Tovmasyan |
#      | fos_user_registration_form[email]                 | test5@test.am |
#      | fos_user_registration_form[plainPassword][first]  | test1234 |
#      | fos_user_registration_form[plainPassword][second] | test1234 |
#    And And I wait for the suggestion box to appear
#    Then I should see "Explore over thousand great ideas"
##    Then I should be on "/ideas"
#    And the response status code should be 200


  @javascript
  Scenario: Login user
    Given I am on "/login"
    When I fill in the following:
      | _username | test@test.am |
      |_password  | test1234 |
    And I press "SIGN IN"
    Then I should see "MOST POPULAR"

  @javascript
  Scenario: Log in with bad credentials
    Given I am on "/login"
    When I fill in the following:
      | _username | bar@foo.com |
      | _password | bar         |
    And I press "SIGN IN"
    Then I should be on "/login"
    And I should see "The email and password you entered did not match our records. Please try again."

