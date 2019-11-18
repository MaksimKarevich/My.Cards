// .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
//   .keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  '@tags': ['all', 'forgot', 'positive'],
  before: function(browser) {
    console.log('Setting up... browser', typeof browser);
  },
  
  after: function(browser) {
    console.log('Closing down... browser', typeof browser);
    browser.end();
  },
  
  'Forgot Password Test': function(browser) {
    const input = {
      username: 'testythetester88@gmail.com',
    };
  
    const url = 'http://cm-app-dev.eu-central-1.elasticbeanstalk.com/';
    const username = Date.now();
    const domain = '@domain.com';
    const elements = {
      email: "input[name='email']",
      buttonReset: 'button[type=\'submit\']',
      textButtonForgot: 'a[href="/auth/forgot-password"]',
      successMessage: 'main > h6 > button > span > svg[aria-hidden="true"]',
      cookiesAccept: 'body > div > div > div >button[tabindex=\'0\']',
    };
    
    browser
      //Navigate to Forgot Password form
      .url(url)
      .waitForElementVisible(elements.email, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .click(elements.cookiesAccept, function () {
        console.log('Cookies are accepted!')
      })
      .click(elements.textButtonForgot)
      .waitForElementVisible(elements.email, 5000, 'Forgot password form is loaded')
      .assert.urlContains('auth/forgot-password', 'You are on the Forgot Password page')
      
      //missing @
      .setValue(elements.email, 'email.domain.com')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //missing address
      .setValue(elements.email, domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //missing domain
      .setValue(elements.email, username + '@')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //incorrect domain
      .setValue(elements.email, 'email@domain')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //last dot in address
      .setValue(elements.email, 'email.' + domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //double dot in address
      .setValue(elements.email, 'email..email' + domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //first dot in address
      .setValue(elements.email, '.' + username + domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //double @@
      .setValue(elements.email, 'email@domain' + domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //first dash in domain
      .setValue(elements.email, 'email@-domain.com')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //last dash in domain
      .setValue(elements.email, 'email@domain-.com')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //garbage
      .setValue(elements.email, 'te"(),:;<>@[\\]st@domain.com')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //copy-paste from address book
      .setValue(elements.email, 'Joe Smith <\email@domain.com>')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //superfluous text or spaces
      .setValue(elements.email, 'email@domain.com (comment)')
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //65 character email
      .setValue(elements.email, 'testtesttesttesttesttesttesttesttesttesttesttesttestte' + domain)
      .assert.attributeContains(elements.email, 'aria-invalid', 'true',
      'Email is too long (maximum is 64 characters)')
      .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
      //Correct email
      .setValue(elements.email, input.username)
      .assert.attributeContains(elements.email, 'aria-invalid', 'false',
      'Entered email is valid')
      .click(elements.buttonReset)
      .waitForElementVisible(elements.successMessage, 5000, 'Email sent success!')
      .click('main > h6 > button > span :nth-child(2)')
  },
};
