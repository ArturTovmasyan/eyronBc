Feature: Draft page
  In order to use draft page and check it
  As a user
  I need to be able to check draft page

  @javascript @draft
  Scenario: Open goal create page
    Given I am logged in
    Given I am on "/goal/drafts"
    Then I should see "Drafts"




