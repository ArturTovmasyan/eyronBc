Feature: Registration
  In order to use register user
  As an anonymous user
  I need to be able to register user

   @register 
  Scenario: Registration
    Given I am on "/register/"
    When I fill in the following:
      | fos_user_registration_form[firstName]             | Art |
      | fos_user_registration_form[lastName]              | Tovmasyan |
      | fos_user_registration_form[email]                 | test6@test.am |
      | fos_user_registration_form[plainPassword][first]  | test1234 |
      | fos_user_registration_form[plainPassword][second] | test1234 |
     And I wait for angular
     And I press "register"
    Then I should be on "/ideas"
    And the response status code should be 200

