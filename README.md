# api-request-validator

This module is under construction

A library to validate API requests attributes

## Install

[![npm downloads](https://img.shields.io/npm/dm/api-request-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=api-request-validator&from=2015-09-01)

	$ npm install api-request-validator

## Usage

### Simple example: login request validation

#### Rules

````sheel
const validationRules = {
	['PAYLOAD_KEY']: {
		['VALIDATION_RULE']: { 
			...
		}
	}
}
````

In our example, the **payload** of the request must be contains

- the **required email** and **password attributes**
- a **valid adresse email** (validated by a **regexp** in this example)
- a **valid password** (validated by a **function** in this example)

````sheet
/*Errors returned by validator if rules are not respected*/
const LOGIN_ERROR_EMAIL_REQUIRED = {
	err: 'login_failure_email__required',
	code: 422,
	message: 'Please, enter your email.'
}
const LOGIN_ERROR_EMAIL_INVALID = { /*WHAT YOU WANT*/ }
const LOGIN_ERROR_EMAIL__TYPE_ERROR = { ... }
const LOGIN_WARNING_EMAIL__DANGEROUS = { ... }

/*Rules*/
const RULES = {
	email: {
    	required: {
    		error: LOGIN_ERROR_EMAIL_REQUIRED
		},
		regexp: {
		    error: LOGIN_ERROR_EMAIL_INVALID,
		    data: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/
		},
		type: {
			error: LOGIN_ERROR_EMAIL__TYPE_ERROR,
			data: 'number'
		},
		methods: ['findExisting', 'isBlacklisted']
	},
	password: {
		...
	}
}
````

####Validate

api-request-validator export a class constructor. The best way to build the validator is to extend the Validator class:

````sheet
import Validator from 'api-request-validator'
	
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
````
####With express

````sheet
app.post('/login, async (req, res, next) => {
	const validator = new LoginValidator(req.body)
	await valiadtor.run()
	if (!validator.valid)
		return next(validator.error)
	if (validator.warnings)
		res.header('api-warnings', validator.warnings)
	
	...
})
````
## To do

####Npm
- Create npm package

####Docs
- Install
- Error template
- Params
- Example

####Validations

- Async function
- Regexp

####Tests