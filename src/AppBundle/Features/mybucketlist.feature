Feature: My Bucket list
  In order to use my bucket list page and check it
  As a user
  I need to be able to check my bucket list page

  Background:
    Given I am logged in

  @javascript @mylist
  Scenario: Open my bucket list page
    When I follow "user2"
    And I follow "My Bucketlist"
    Then I should be on "/user-profile"


