const _ = require('lodash')

class Validator {
    constructor(validations = {}, data = {}, options = {}) {
        //Set params to this
        this.validations = validations //Validations rules
        this.data = data //Data to validate
        //Default values
        this.isValid = true
        this.error = null
        this.warnings = {}
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
        this.checkType(validation, data)
        this.checkRegexp(validation, data)
        this.checkValue(validation, data)
    }

    /*If the required option is true in validation, we check if data is not undefined*/
    checkRequired(validation, data) {
        if (!validation.required)
            return

        if (validation.dependent && 
            validation.dependentValue && 
            this.data[validation.dependent] && 
            this.data[validation.dependent] === validation.dependentValue &&
            data === undefined
        )
            return this.throw(validation, 'required')

        if (!validation.dependent && validation.required && data === undefined)
            return this.throw(validation, 'required')
    }

    /*Value check (function, regexp, ...)*/
    checkValue(validation, data) {
        if (!validation.value || !this.isValid)
            return
        if (validation.value.func)
            return this.checkValueFn(validation, data)
        if (validation.value.enum && data && validation.value.enum.indexOf(data) === -1)
            this.throw(validation, 'value')
    }

    /*Run value validation function (if validation.value is a function)*/
    checkValueFn(validation, data) {
        if (!validation.value.func(data))
            this.throw(validation, 'value')
    }

    checkRegexp(validation, data) {
        if (!validation.regexp || !validation.regexp.match || !this.isValid)
            return

        if (!validation.regexp.match.exec(data))
            this.throw(validation, 'regexp')
    }

    checkType(validation, data) {
        if (!validation.type || !data)
            return
        const { type } = validation.type

        const switchType = (type) => {
            switch(type) {

            case 'number':
                const int = parseInt(data)
                return typeof(int) === 'number' && !isNaN(int)

            case 'string':
                return typeof(data) === 'string'

            case 'object':
                return _.isObject(data)

            case 'boolean':
                return _.isBoolean(data)

            default: return true

            }
        }

        const isValid = switchType(type)
        if (!isValid)
            this.throw(validation, 'type')
    }

    /*****ERROR AND WARNING*****/
    
    /*Throw warning or error*/
    throw(validation, validationRule) {
        if (validation[validationRule].warning)
            return this.throwWarning(validation, validationRule)
        this.throwError(validation, validationRule)
    }

    /*Throw error*/
    throwError(validation, validationRule) {
        this.isValid = false
        if (!this.error)
            this.error = {}
        if (validation[validationRule].error)
            this.error = validation[validationRule].error
    }

    /*Throw warning*/
    throwWarning(validation, validationRule) {
        this.warnings[validation[validationRule].warning.message] = validation[validationRule].warning.info || ''
        const fallback = validation[validationRule].fallback || validation.fallback
        if (fallback)
            this.fallbacks[validation.key] = fallback
    }
}

export default Validator