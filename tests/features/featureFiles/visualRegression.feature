Feature: Visual Regression test

  @webdriverIOScenario1
  Scenario: Visual regression for Volvo car page
  
    Given user on the volvocar homepage
    And user select Menu option
    Then validate visual regression