# api-request-validator

This module is under construction

A library to validate API requests attributes

## Install

[![npm downloads](https://img.shields.io/npm/dm/api-request-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=api-request-validator&from=2015-09-01)

    $ npm install api-request-validator

## Usage

#### Rules

**TO DO: List & descriptions of each validation rules**

    const validationRules = {
      ['PAYLOAD_KEY']: {
        ['VALIDATION_RULE']: { 
          data: ...,
          error: { }
        }
      }
    }

### Simple example: login request validation

In our example, the accepted **payload** of the request is like this: 

    {
      email: 'jon@world.com',
      password: 'Monkey123'
    }

To validate the email attribute, we use followings rules:

- required
- type (string)
- regexp
- custom async methods

####Constructor

api-request-validator export a class constructor. The best way to build the validator is to extend the Validator class and set `RULES` as first argument of `super()` in `constructor()`:

    import Validator from 'api-request-validator'

    const RULES = {
      email: {
        required: {
          error: LOGIN_ERROR_EMAIL_REQUIRED
        },
        type: {
          error: LOGIN_ERROR_EMAIL__TYPE_ERROR,
          data: 'string'
        },
        regexp: {
          error: LOGIN_ERROR_EMAIL_INVALID,
          data: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/
        },
        methods: ['findExisting', 'isBlacklisted']
      },
      password: {
        ...
      }
    }
      
    class LoginValidator extends Validator {
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

##### Examples of errors 

    /*Errors returned by validator if rules are not respected*/
    const LOGIN_ERROR_EMAIL_REQUIRED = {
      err: 'login_failure_email__required',
      code: 422,
      message: 'Please, enter your email.'
    }
    const LOGIN_ERROR_EMAIL_INVALID = { /*WHAT YOU WANT*/ }
    const LOGIN_ERROR_EMAIL__TYPE_ERROR = { ... }
    const LOGIN_WARNING_EMAIL__DANGEROUS = { ... }

####Validate express payload

    app.post('/login, async (req, res, next) => {
      const validator = new LoginValidator(req.body)
      await valiadtor.run()
      if (!validator.valid)
        return next(validator.error)
      if (validator.warnings)
        res.header('api-warnings', validator.warnings)
      
      ...
    })

## To do

- write correct documentation
- tests
- examples
- imrove :)