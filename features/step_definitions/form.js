const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const UserRegistrationValidator = require('../validators/UserRegistration')
const USER = require('../constants/USER')
const _ = require('lodash')

Given('I\'am a visitor of the application', async function () {
})

When('I complete the user registration form', async function () {
    this.payload = _.cloneDeep(USER)
})

When(/^I forgot the (.*) field$/, async function (field) {
    delete this.payload[field]
})

When('I forgot the latitude field of location', async function () {
    delete this.payload.location.lat
})

When('I forgot the longitude field of location', async function () {
    delete this.payload.location.lng
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

When('I write an invalid email type', async function () {
    this.payload.email = { message: 'yo!' }
})

When('I write an invalid latitude type', async function () {
    this.payload.location = { ...this.payload.location, lat: 'missing_latitude' }
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

Then('I receive the several errors', async function () {
    expect(Object.keys(this.validator.errors).length).to.be.at.least(2)
})