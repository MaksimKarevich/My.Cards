// .setValue(elements.email, ['', [browser.Keys.CONTROL, "a"]])
//   .keys('\ue003')
// These elements used because .clearValue is not worked properly

module.exports = {
  
  //Commands block
  '@disabled': false, // true - will disable this test
  '@tags': ['all', 'register', 'negative', 'regneg'],
  
  //The block that launching before the browser starts
  before: function (browser) {
    console.log('Setting up... browser', typeof browser);
  },
  //Block that will be launching after the browser end working
  after: function (browser) {
    browser.end();
    console.log('Closing down... browser', typeof browser);
  },
  
  'Register Tests Negative': function (browser) {
    const url = 'http://cm-app-dev.eu-central-1.elasticbeanstalk.com/';
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
    };
    
    browser
      //Navigate to Register form
      .url(url)
      .waitForElementVisible(elements.textButtonRegister, 5000, 'Website is loaded')
      .assert.urlContains('auth/login', 'You are on the Login page')
      .click(elements.textButtonRegister)
      .waitForElementVisible(elements.fieldEmail, 5000, 'Register page is loaded')
      .assert.urlContains('auth/register', 'You are on the Register page')
      .assert.attributeContains(elements.buttonCreate, 'disabled', 'true',
      'Create Account button is disabled')
      
      //missing @
      .setValue(elements.fieldEmail, 'email.domain.com')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //missing address
      .setValue(elements.fieldEmail, domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //missing domain
      .setValue(elements.fieldEmail, username + '@')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //incorrect domain
      .setValue(elements.fieldEmail, 'email@domain')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //last dot in address
      .setValue(elements.fieldEmail, 'email.' + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //double dot in address
      .setValue(elements.fieldEmail, 'email..email' + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //first dot in address
      .setValue(elements.fieldEmail, '.' + username + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //double @@
      .setValue(elements.fieldEmail, 'email@domain' + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //first dash in domain
      .setValue(elements.fieldEmail, 'email@-domain.com')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //last dash in domain
      .setValue(elements.fieldEmail, 'email@domain-.com')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //garbage
      .setValue(elements.fieldEmail, 'te"(),:;<>@[\\]st@domain.com')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //copy-paste from address book
      .setValue(elements.fieldEmail, 'Joe Smith <\email@domain.com>')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //superfluous text or spaces
      .setValue(elements.fieldEmail, 'email@domain.com (comment)')
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //65 character email
      .setValue(elements.fieldEmail, 'testtesttesttesttesttesttesttesttesttesttesttesttestte' + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'true',
      'Email is not valid')
      .setValue(elements.fieldEmail, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //valid email and 5 character password
      .setValue(elements.fieldEmail, username + domain)
      .assert.attributeContains(elements.fieldEmail, 'aria-invalid', 'false',
      'Email is valid')
      .setValue(elements.fieldPassword, 'Test1')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
       //password only letters
      .setValue(elements.fieldPassword, 'Testte')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //password only numbers
      .setValue(elements.fieldPassword, '123456')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //password without uppercase
      .setValue(elements.fieldPassword, 'q12345')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //password without lowercase
      .setValue(elements.fieldPassword, 'Q12345')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //21 character long password
      .setValue(elements.fieldPassword, 'Qwe123testtesttesttes')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'true',
      'Password is not valid')
      .setValue(elements.fieldPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //valid email, password
      .setValue(elements.fieldPassword, 'Qwe123testtesttestte')
      .assert.attributeContains(elements.fieldPassword, 'aria-invalid', 'false',
      'Password is valid')
      .setValue(elements.fieldConfirmPassword, 'q')
      .assert.attributeContains(elements.fieldConfirmPassword, 'aria-invalid', 'true',
      'Confirm password is not equal to the password')
      .setValue(elements.fieldConfirmPassword, ['', [browser.Keys.CONTROL, "a"]])
      .keys('\ue003')
      //Valid fields, unchecked policy
      .setValue(elements.fieldConfirmPassword, 'Qwe123testtesttestte')
      .assert.attributeContains(elements.fieldConfirmPassword, 'aria-invalid', 'false',
      'Confirm password is equal to the password')
      .assert.attributeContains(elements.buttonCreate, 'disabled', 'true',
      'Policy must be checked')
      .click(elements.inputCheckbox)
      .assert.attributeContains(elements.buttonCreate, 'tabindex', '0',
      'Policy is checked')
  },
};