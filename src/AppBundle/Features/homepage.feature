Feature:Homepage
  In order I open www.Bucket List 127.com
  As a user
  I need to be able to see Homepage

  @javascript @homepage
  Scenario: I should see Homepage irrespective of the fact whether I am logged in or not
    Given I am on "/"
    Then I should see "Have your list of goals for life and see how much more you would achieve over what you could possibly imagine."
    And I click on the scroll icon
    Then I should see "Explore over thousand great ideas"
    When I follow "DISCOVER MORE"
    Then I should be on "/ideas"
    And I should see "Explore over thousand great ideas"
    And I press share link
    And I wait for angular
    And I follow "Close"
    And I wait for angular
    And I follow "ADD"
    And I wait for angular
    Then I should see "SIGN IN"
    When I follow "JOIN"
    And I follow "DONE"
    And I wait for angular
    And I follow "JOIN"
    Then I should see "SIGN IN"
