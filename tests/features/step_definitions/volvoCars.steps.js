const { Given, When, Then } = require('cucumber');

const homePage = require('../../pages/volvoCars.page.js');
const home = new homePage();



Given(/^user on the volvocar homepage$/, () => {
    home.openwebdriverIOHomepage();
    
});

When(/^user select Menu option$/, () => {
  
    home.selectMenuOption();
});

Then(/^user sees differnt types of cars$/, () => {
   
    home.validateCarsOption();
});

Then(/^validate visual regression$/, () => {
   
    home.visualRegression();
});