//.setValue(SELECTOR, ['', [browser.Keys.CONTROL, 'a']])
//.keys('\ue003')
// These elements used because .clearValue is not worked properly
module.exports = {
    '@tags': ['all', 'profile', 'negative'],
    before: function (browser) {
        console.log('Setting up... browser', typeof browser);
    },

    after: function (browser) {
        console.log('Closing down... browser', typeof browser);
        browser.end();
    },

    'User profile Tests Negative': function (browser) {

        const input = {
            username: 'a@a.aa',
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
        const url = 'http://localhost:3000/';
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
          .keys('\ue003')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.phoneNumber, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is required')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is required')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, username)
          .setValue(elements.lastName, faker.name.lastName())
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'false',
          'First Name valid')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'false',
          'Last Name is valid')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'Tes')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'Tes')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too short')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too short')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too long')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too long')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, username)
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.phoneNumber, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.phoneNumber, '+12019379992')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'false',
          'First Name is valid')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is required')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'false',
          'Phone Number is valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, faker.name.lastName())
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is required')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'false',
          'Last Name is valid')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'false',
          'Phone Number is valid')

          .setValue(elements.firstName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'Tes')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too long')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too short')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'false',
          'Phone Number is valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'Tes')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too short')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too long')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'false',
          'Phone Number is valid')

          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.phoneNumber, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.phoneNumber,'9876543210')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too short')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is required')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is not valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, faker.name.lastName())
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too long')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'false',
          'Last Name is valid')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is not valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'Tes')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is required')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too short')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is not valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, username)
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'false',
          'First Name is valid')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too long')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is not valid')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.phoneNumber, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too long')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is required')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, 'Tes')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, faker.name.lastName())
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is too short')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'false',
          'Last Name is valid')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.firstName, username)
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'Tes')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'false',
          'First Name is valid')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too short')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')

          .setValue(elements.firstName, ['', [browser.Keys.CONTROL, "a"]])
          .keys('\ue003')
          .setValue(elements.lastName, ['', [browser.Keys.CONTROL, "a"]])
          .setValue(elements.lastName, 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt')
          .assert.attributeEquals(elements.firstName, 'aria-invalid', 'true',
          'First Name is required')
          .assert.attributeEquals(elements.lastName, 'aria-invalid', 'true',
          'Last Name is too long')
          .assert.attributeEquals(elements.phoneNumber, 'aria-invalid', 'true',
          'Phone Number is required')
          //Logout
          .useXpath()
          .click(elements.buttonLogout)
          .useCss()
          .waitForElementVisible(elements.email, 5000, 'You are logged out');
    },
};