module.exports = {
  '@tags': ['all', 'login', 'positive'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },

  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },

  'Login Test Positive': function(browser) {
    const input = {
      username: 'a@a.aa',
      password: 'Qwe123'
    };
    
    const url = 'http://localhost:3000/';
    const elements = {
      email: "input[name='email']",
      password: "input[name='password']",
      buttonLogin: 'button[type=\'submit\']',
      buttonLogout: '//span[contains(text(),\'Sign out\')]',
    };

    browser
      .url(url)
      .waitForElementVisible(elements.email, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .assert.attributeContains(elements.buttonLogin, 'disabled', 'true',
      'Button is disabled')
      .setValue(elements.email, input.username)
      .setValue(elements.password, input.password)
      .click(elements.buttonLogin)
      .useXpath()
      .waitForElementVisible(elements.buttonLogout, 5000, 'Logout button is visible')
      .assert.urlContains('/dashboard', 'You are Logged In')
      .click(elements.buttonLogout)
      .useCss()
      .waitForElementVisible(elements.email, 5000, 'You are logged out');
  },
};
