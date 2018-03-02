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
    }

    async run () {
        await this.makeValidations()
    }

    /*****VALIDATIONS*****/
    /*Make validation: make all vadations*/
    async makeValidations() {
        const { validations, data } = this
        for (const key in validations) {
            if (this.isValid)
                await this.validate({ ...validations[key], key }, data[key])
        }
    }

    /*Check all validations types (required, value)*/
    async validate(validation, data) {
        this.checkRequired(validation, data)
        this.checkType(validation, data)
        this.checkRegexp(validation, data)
        this.checkEnum(validation, data)
        await this.checkAsyncMethods(validation, data)
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

    /*Check if value is in enum*/
    checkEnum(validation, data) {
        if (validation.enum && data && validation.enum.data.indexOf(data) === -1)
            this.throw(validation, 'enum', { validationInfo: `The value must be: ${validation.enum.data}` })
    }

    checkRegexp(validation, data) {
        if (!validation.regexp || !validation.regexp.data || !this.isValid)
            return

        if (!validation.regexp.data.exec(data))
            this.throw(validation, 'regexp', { validationInfo: `Regexp: ${validation.regexp.data}` })
    }

    checkType(validation, data) {
        if (!validation.type || !data)
            return
        const type = validation.type.data
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
            this.throw(validation, 'type', { validationInfo: `The ${validation.key} attribute must be a ${type}` })
    }

    async checkAsyncMethods(validation, data) {
        if (!validation.asyncMethods)
            return
        const methods = validation.asyncMethods.filter(method => this[method.data])
        for (let method of methods) {
            const valid = await this[method.data](data)
            if (!valid) {
                this.throw(validation, 'asyncMethods', { error: method.error })
                break
            }
        }
    }

    /*****ERROR AND WARNING*****/
    
    /*Throw warning or error*/
    throw(validation, validationRule, options = {}) {
        if (validation[validationRule].warning)
            return this.throwWarning(validation, validationRule, options)
        this.throwError(validation, validationRule, options)
    }

    /*Throw error*/
    throwError(validation, validationRule, options = {}) {
        this.isValid = false

        if (validation[validationRule].error) {
            if (!validation[validationRule].error.validationInfo && options.validationInfo)
                validation[validationRule].error.validationInfo = options.validationInfo
            this.error = validation[validationRule].error
        } else if (options.error) {
            this.error = options.error
        }
    }

    /*Throw warning*/
    throwWarning(validation, validationRule, options = {}) {
        this.warnings[validation[validationRule].warning.message] = validation[validationRule].warning.info || ''
        const fallback = validation[validationRule].fallback || validation.fallback
        if (fallback)
            this.fallbacks[validation.key] = fallback
    }
}

export default Validator