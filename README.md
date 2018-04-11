# api-request-validator

**This module is under construction**

A library to validate API requests attributes

## Install

[![npm downloads](https://img.shields.io/npm/dm/api-request-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=api-request-validator&from=2015-09-01)

    $ npm install api-request-validator

## Test

    $ npm run test

## Usage

#### Rules

|  Rule           |      Description              | Valid condition                   |
|-----------------|-------------------------------|-----------------------------------|
| required        | value is required             | `value !== undefined`             |
| enum            | value must be quel to         | `enum.indexOf(value !== -1)`      |
| type            | type of value                 | `typeof(value) === type`          |
| regexp          | regexp must be match value    | `regexp.exec(value)`              |
| asyncMethods    | custom async functions        | `() => true`                      |

**TO DO: Explain the difference between error and warning**

    const validationRules = {
      ['PAYLOAD_KEY']: {
        ['VALIDATION_RULE']: { 
          data: ...,
          error: { }
        },
        ['VALIDATION_RULE']: { 
          data: ...,
          warning: { }
        }
      }
    }

### Simple example: user registration request validation

[See a the example here!](https://github.com/Pitbi/api-request-validator/blob/master/features/validators/UserRegistration.js)

[Scenario of example](https://github.com/Pitbi/api-request-validator/blob/master/features/user_registration_validation.feature)

#### Constructor

api-request-validator export a class constructor. The best way to build the validator is to extend the Validator class and set `RULES` as first argument of `super()` in `constructor()`. This approach allows to pass methods to the validator, like this:



    import Validator from 'api-request-validator'
      
    class UserRegistrationValidator extends Validator {
      constructor(payload) {
        super(RULES, payload, {})
      }
      
      async beforeValidate() {
      
      }
      
      async afterValidate() {
      
      }
      
      async findExisting(email) {
        const existing = await User.findOne({ email ))
        return !existing
      }
      
      async isBlacklisted(email) {
        ...
      }
    }

Or for simple case

    const validator = new Validator(RULES, payload)

#### Example with express

    app.post('/login, async (req, res, next) => {
      const validator = new LoginValidator(req.body)
      await validator.run()
      if (!validator.valid)
        return next(validator.error)
      if (validator.warnings)
        res.header('api-warnings', validator.warnings)
      
      ...
    })

## To do

- write correct documentation
- imrove :)