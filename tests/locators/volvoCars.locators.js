class homeLocators {
  constructor() {
    this.searchField = '//*[@id="site-nav-topbar-wrapper"]/nav/div[1]/a/img';
    this.carsMenu = '//span[contains(text(),"Cars")]';
    this.noResultsFound = '//*[@id="nav:topNavCarMenu"]/em/span';
    this.cookie = '/html/body/div[1]/div[2]/div[4]/div[2]/div/button';
    this.electric = '//*[@id="site-nav-cars-menu-section-tab-0"]/h2';
    this.hybrid = '//*[@id="site-nav-cars-menu-section-tab-1"]/h2';
    this.mildhybrid = '//*[@id="site-nav-cars-menu-section-tab-2"]/h2';
  }
}

module.exports = homeLocators;
