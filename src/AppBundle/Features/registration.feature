Feature: Login user
  In order to use registration user
  As an anonymous user
  I need to be able to register user

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
    Given I am on "/"
    When I follow "JOIN"
    And I wait for angular
    And I fill in "_username" with "test@test.am"
    And I fill in "_password" with "test1234"
    And I press "SIGN IN"
    Then I should be on "/ideas"


