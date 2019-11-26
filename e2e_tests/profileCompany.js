//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  '@tags': ['all', 'profile', 'positive'],
  before: function (browser) {
    console.log('Setting up... browser', typeof browser);
  },
  
  after: function (browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },
  
  'Company profile Test': function (browser) {
    const input = {
      username: 'a@a.aa',
      password: 'Qwe123'
    };
    const elements = {
      email: "input[name='email']",
      password: "input[name='password']",
      buttonSave: '//span[contains(text(),\'Save Changes\')]',
      buttonLogin: 'button[type="submit"]',
      buttonLogout: '//span[contains(text(),\'Sign out\')]',
      compName: 'input[name="name"]',
      compNum: 'input[name="number"]',
      compVat: 'input[name="VATNumber"]',
      compAddress: 'input[name="addressLine"]',
      compCountry: '//body/div/div/div/main/div/div[3]/div/div[2]/div/form/div[2]/div/div[4]',
      compCity: 'input[name="city"]',
      compCode: 'input[name="postalCode"]',
      settingsBtn: 'a[href="/settings"]',
      messSuccess: '//span[contains(text(),\'Successfully saved changes!\')]',
      tabCompany: 'button[class="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit"]',
    };
    const url = 'http://localhost:3000/';
    const today = new Date().toLocaleString();
    const compName = 'Test Company ' + today;
    //Add Faker for random data
    const faker = require('faker');
    browser
      //Login to account
      .url(url)
      .waitForElementVisible(elements.email, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .assert.attributeContains(elements.buttonLogin, 'disabled', 'true',
      'Button is disabled')
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      //Navigate to profile Settings
      .waitForElementVisible(elements.settingsBtn, 5000, 'You are logged in')
      .click(elements.settingsBtn)
      .waitForElementVisible(elements.tabCompany, 5000, 'Navigated to profile')
      .assert.urlContains('/settings/general', 'You are on the Settings page')
      .click(elements.tabCompany)
      .assert.urlContains('/settings/company', 'You are on the Company page')
      //Fill the company profile
      .setValue(elements.compName, ['', [browser.Keys.CONTROL, 'a']])
      .setValue(elements.compName, compName)
      .setValue(elements.compNum, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.compNum, faker.random.number(987654321))
      .setValue(elements.compVat, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.compVat, faker.random.number())
      .setValue(elements.compAddress, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.compAddress, faker.address.streetAddress())
      .setValue(elements.compCity, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.compCity, faker.address.city())
      .setValue(elements.compCode, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.compCode, faker.address.zipCode())
      .useXpath()

      .click(elements.buttonSave)
      .waitForElementVisible(elements.messSuccess, 5000,
        'Company information successfully updated!')
      //Logout
      .click(elements.buttonLogout)
      .useCss()
      .waitForElementVisible(elements.email, 5000, 'You are logged out');
  },
};