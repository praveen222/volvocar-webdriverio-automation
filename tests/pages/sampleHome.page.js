const NativePage = require('./native.page.js');
const webdriverIOHomePageData = require('../files/testData/sampleHome.data.js');


class sampleHomePage extends NativePage {

  get webdriverIOHomePageElement() {
    return this.getPage('sampleHome.locators');
  }

  openwebdriverIOHomepage() {
    browser.url(webdriverIOHomePageData['url']);
    browser.pause(10000);
    const accept = $(this.webdriverIOHomePageElement.cookie)
    accept.waitForDisplayed();
    accept.click();

    //browser.saveFullPageScreen('examplePaged.png', {});
    //expect(browser.saveFullPageScreen('examplePaged.png', { /* some options */ })).toEqual(0);
  
  }

  selectMenuOption() {

    const carsMenu = $(this.webdriverIOHomePageElement.carsMenu);
    carsMenu.waitForDisplayed();
    browser.pause(10000);
    carsMenu.click();
    browser.pause(10000);   
  }

  validateCarsOption() {
    browser.pause(10000);
    const electric = $(this.webdriverIOHomePageElement.electric)
    electric.waitForDisplayed();
    const hybrid = $(this.webdriverIOHomePageElement.hybrid)
    hybrid.waitForDisplayed();
    const mildhybrid = $(this.webdriverIOHomePageElement.mildhybrid)
    mildhybrid.waitForDisplayed();      
  }

  visualRegression() {
    
    // browser.saveScreen('carspage1.png', {});
    // expect(browser.saveScreen('carspage1.png', { /* some options */ })).toEqual(0);
    const electricVechicle = $(this.webdriverIOHomePageElement.electric)
    browser.saveElement(electricVechicle, 'electricVechicle.png', { /* some options */ });
    expect(browser.checkElement(electricVechicle, 'electricVechicle.png', { /* some options */ })).toEqual(0);

    
  }

}

module.exports = sampleHomePage;
