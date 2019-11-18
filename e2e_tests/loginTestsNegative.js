//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  '@tags': ['all', 'login', 'negative', '1'],

  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Login Tests Negative': function(browser) {
    const url = 'http://cm-app-dev.eu-central-1.elasticbeanstalk.com/';
    const elements = {
      email: "input[name='email']",
      password: "input[name='password']",
      buttonLogin: 'button[type=\'submit\']',
      buttonLogout: '//span[contains(text(),\'Sign out\')]',
      iconX: '#root > main > h6 > button > span.MuiIconButton-label > svg',
      error: '#root > main > h6 > div',
    };

    browser
      //Navigate to Login page
      .url(url)
      .waitForElementVisible(elements.email, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .assert.attributeContains(elements.buttonLogin, 'disabled', 'true',
      'Button is disabled')
      //Send empty form
      .setValue(elements.email, ' ')
      .setValue(elements.password, ' ')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is required')
      .assert.attributeContains(elements.password, 'aria-invalid', 'true',
      'Password is required')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.password, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //Fill both field with invalid data
      .setValue(elements.email, 'email.domain.com')
      .setValue(elements.password, 'q')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      .setValue(elements.password, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //Login with correct email and incorrect password
      .setValue(elements.email, 'email@domain.com')
      .setValue(elements.password, 'q')
      .click(elements.buttonLogin)
      .waitForElementVisible(elements.error, 5000, 'Invalid credentials')
      .click(elements.iconX)
      .setValue(elements.password, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //Valid email and empty password
      .assert.attributeContains(elements.password, 'aria-invalid', 'true',
      'Password is required')
      //Case Sensitive email, need to add later, when its will be released
     
  },
};
