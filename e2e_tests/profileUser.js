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
  
  'User profile Test': function (browser) {
    
    const input = {
      username: 'testythetester88@gmail.com',
      password: 'Qwe123'
    };
    const elements = {
      email: "input[name='email']",
      password: "input[name='password']",
      buttonSave: '//span[contains(text(),\'Save Changes\')]',
      buttonLogin: 'button[type=\'submit\']',
      buttonLogout: '//span[contains(text(),\'Sign out\')]',
      firstName: 'input[name="firstName"]',
      lastName: 'input[name="lastName"]',
      phoneNumber: 'input[name="phone"]',
      settingsBtn: 'a[href="/settings"]',
      messSuccess: '//span[contains(text(),\'Successfully saved changes!\')]',
    };
    const url = 'http://cm-app-dev.eu-central-1.elasticbeanstalk.com/';
    const today = new Date().toLocaleString();
    const username = 'Test User ' + today;
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
      .waitForElementVisible(elements.firstName, 5000, 'Navigated to profile')
      .assert.urlContains('/settings/general', 'You are on the Settings page')
      //Fill the user profile
      .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.firstName, username)
      .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.lastName, faker.name.lastName())
      .setValue(elements.phoneNumber, ['', [browser.Keys.CONTROL, "a"]])
      .setValue(elements.phoneNumber, faker.phone.phoneNumber())
      .useXpath()
      .click(elements.buttonSave)
      .waitForElementVisible(elements.messSuccess, 5000,
        'Profile information successfully updated!')
      //Logout
      .click(elements.buttonLogout)
      .useCss()
      .waitForElementVisible(elements.email, 5000, 'You are logged out');
  },
};