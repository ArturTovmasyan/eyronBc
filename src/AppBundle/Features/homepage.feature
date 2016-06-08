Feature: Homepage
  In order I open www.Bucket List 127.com
  As a anonymous
  I need to be able to see Homepage

  @javascript @homepage
  Scenario: I should see Homepage irrespective of the fact whether I am logged in or not
    Given I am on "/"
    Then I should see "Have your list of goals for life and see how much more you would achieve over what you could possibly imagine."
    Then I should see "Discover thousands of great ideas for your Bucket List"
    When I click on "btn btn-purple"
    Then I should be on "/ideas"
