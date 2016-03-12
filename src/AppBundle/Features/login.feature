Feature: Sign in
  In order I log in
  As a anonymous
  I should be able to enter Bucket List and see what's going on there

  @javascript @login
  Scenario: Login user
    Given I am on "/"
    When I follow "JOIN"
    And I set username "user1@user.com" and password "Test1234"
    Then I should see "user1"


#  @javascript
#  Scenario: Login with bad credentials
#    Given I am on "/"
#      When I wait for angular
#      When I follow "JOIN"
#      And I set username "user1@user.com" and password "Test1234"
#      And I wait for angular
#      Then I should be on "/"
#      And I should see "The email and password you entered did not match our records. Please try again."
#
#  @javascript
#  Scenario: Log in admin user
#    Given I am on "/"
#    When I wait for angular
#    When I follow "JOIN"
#    And I set username "admin@admin.com" and password "Test1234"
#    Then I should be on "/admin/dashboard"
#
#    # this is not login page
#    And I should see "Homepage"
