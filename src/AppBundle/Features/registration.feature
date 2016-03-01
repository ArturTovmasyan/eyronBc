Feature: Search
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
#    When I press the search button
#    Then I should see "Passwords do not match, please retype"
#    Then I should be redirect on "/ideas"
#    And the response status code should be 200

  Background:
    Given I am on "/wiki/Main_Page"

  Scenario Outline: Searching for a specific page
    When I fill in the search box with "<search>"
    And I press the search button
    Then I should see "<expectation>"

    Examples:
      | search             | expectation                      |
      | Velociraptor       | an enlarged sickle-shaped claw   |
      | Tyrannosaurus Bill | Search results                   |
