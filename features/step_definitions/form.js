const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const UserRegistrationValidator = require('../validators/UserRegistration')

Given('I\'am a visitor of the application', async function () {

})

When(/^I write (.*) as (.*)$/, async function (value, field) {
    this.payload[field] = value
})

When('I submit the user registration form', async function () {
    this.validator = new UserRegistrationValidator(this.payload)
    await this.validator.run()
})

When('I write an invalid comment type', async function () {
    this.payload.comment = { message: 'yo!' }
})

Then('the form is valid', async function () {
    expect(this.validator.isValid).to.be.true
})

Then('the form is invalid', async function () {
    expect(this.validator.isValid).to.be.false
})

Then(/^I receive the error (.*)$/, async function (error) {
    expect(this.validator.error.err).to.be.equal(error)
})