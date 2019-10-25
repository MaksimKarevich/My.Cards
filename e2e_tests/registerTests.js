module.exports = {
  
  //Commands block
  '@disabled': false, // true - will disable this test
  '@tags': ['all', 'register', 'positive', 'regpos'],
  
  //The block that launching before the browser starts
  before: function (browser) {
    console.log('Setting up... browser', typeof browser);
  },
  //Block that will be launching after the browser end working
  after: function (browser) {
    browser.end();
    console.log('Closing down... browser', typeof browser);
  },
  
  'Register Tests Positive': function (browser) {
    const url = 'http://localhost:3000/';
    const username = Date.now();
    const domain = '@domain.com';
    const input = {
      password: 'Qwe123'
    };
    
    //Page elements
    const elements = {
      textButtonRegister: 'a[href="/auth/register"]',
      fieldEmail: 'input[name="email"]',
      fieldPassword: 'input[name="password"]',
      fieldConfirmPassword: 'input[name="confirmPassword"]',
      inputCheckbox: 'input[type="checkbox"]',
      buttonCreate: 'button[type="submit"]',
      mainApp: 'input[name="code"]',
    };
    
    
    browser
      //Navigate to Register form
      .url(url)
      .waitForElementVisible(elements.textButtonRegister, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .click(elements.textButtonRegister)
      .waitForElementVisible(elements.fieldEmail, 5000, 'Register page is loaded')
      .assert.urlContains('auth/register', 'You are on the Register page')
      .setValue(elements.fieldEmail, username + domain)
      .setValue(elements.fieldPassword, input.password)
      .setValue(elements.fieldConfirmPassword, input.password)
      .click(elements.inputCheckbox)
      .click(elements.buttonCreate)
      .waitForElementVisible(elements.mainApp, 5000, 'Verification page is loaded')
      .assert.urlContains('auth/signup-verification', 'You are on the Verification page')
  },
};