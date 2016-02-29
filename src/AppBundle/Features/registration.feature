Feature: Registration
  In order to use registration user
  As a visitor
  I need to be able to register user

  Scenario: Registration
    Given I am on "/register"
    When I fill in "fos_user_registration_form[firstName]" with "Art"
    When I fill in "fos_user_registration_form[lastName]" with "Tovmasyan"
    When I fill in "fos_user_registration_form[email]" with "test5@test.am"
    When I fill in "fos_user_registration_form[plainPassword][first]" with "test1234"
    When I fill in "fos_user_registration_form[plainPassword][second]" with "test1234"
    When I press "register"
    Then I should be on "/ideas"
    Then I should see "Hi, Foo"
    When I follow "Logout"
    Then I should be on "/login"
    Then the response status code should be 200


