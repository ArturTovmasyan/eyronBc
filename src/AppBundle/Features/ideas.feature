Feature: Ideas
  In order to use ideas page and check it
  As an anonymous user
  I need to be able to check ideas page

  @javascript
  Scenario: Open the ideas page
    Given I am on "/ideas"
    And I should be on "/ideas"
    And I should see "Explore over thousand great ideas"


