const _ = require('lodash')

class Validator {
    constructor(validations = {}, data = {}) {
        //Set params to this
        this.validations = validations  //Validations rules
        this.data = data                //Data to validate
        
        //Default values
        this.isValid = true
        this.error = null
        this.warnings = []
        this.fallbacks = {}

        //Run validations
        this.makeValidations()
    }

    /*****VALIDATIONS*****/
    /*Make validation: make all vadations*/
    makeValidations() {
        const { validations, data } = this
        for (const key in validations) {
            if (this.isValid)
                this.validate({ ...validations[key], key }, data[key])
        }
    }

    /*Check all validations types (required, value)*/
    validate(validation, data) {
        this.checkRequired(validation, data)
        this.checkValue(validation, data)
    }

    /*If the required option is true in validation, we check if data is not undefined*/
    checkRequired(validation, data) {
        if (validation.required && !data)
            this.throw(validation, 'required')
    }

    /*Value check (function, regexp, ...)*/
    checkValue(validation, data) {
        if (!validation.value || !this.isValid)
            return
        
        if (validation.value.fn)
            return this.checkValueFn(validation, data)
    }

    /*Run value validation function (if validation.value is a function)*/
    checkValueFn(validation, data) {
        if (!validation.value.fn(data))
            this.throw(validation, 'value')
    }


    /*****ERROR AND WARNING*****/
    
    /*Throw warning or error*/
    throw(validation, validationRule) {
        const { types = {} } = validation
        if (validation[validationRule].type === 'warning')
            return this.throwWarning(validation, validationRule)
        this.throwError(validation, validationRule)
    }

    /*Throw error*/
    throwError(validation, validationRule) {
        this.isValid = false
        this.error = {}

        if (validation[validationRule].code)
            this.error.code = validation[validationRule].code
        if (validation[validationRule].message)
            this.error.err = validation[validationRule].message
        if (validation[validationRule].info)
            this.error.info = validation[validationRule].info
    }

    /*Throw warning*/
    throwWarning(validation, validationRule) {
        let warning = validation[validationRule].message || ''
        if (validation[validationRule].info)
            warning += ` ${validation[validationRule].info}` 
        this.warnings.push(warning)
        if (validation[validationRule].fallback)
            this.fallbacks[validation.key] = validation[validationRule].fallback
    }
}

export default Validator