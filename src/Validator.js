const _ = require('lodash')

class Validator {
    constructor(validations = {}, data = {}, options = {}) {
        //Set params to this
        this.validations = validations //Validations rules
        this.data = data //Data to validate
        //Default values
        this.isValid = true
        this.error = null
        this.errors = {}
        this.asyncMethodsErrors = []
        this.warnings = []
        this.fallbacks = {}
        this.options = options
    }

    async run () {
        await this.beforeValidate(this.data)
        this.filterPayload()
        await this.makeValidations()
        await this.afterValidate(this.data)
    }

    /***Hooks***/
    async beforeValidate() {
        return true
    }
    async afterValidate() {
        return true
    }

    /*Filter payload*/
    filterPayload() {
        if (!this.options.filter)
            return
        let keys = Object.keys(this.validations)
        if (this.options.acceptedFilterKeys)
            keys = keys.concat(this.options.acceptedFilterKeys)
        for (const key in this.data) {
            if (!keys.includes(key))
                delete this.data[key]
        }
    }

    /*****VALIDATIONS*****/
    /*Make validation: make all vadations*/
    async makeValidations() {
        const { validations, data } = this
        for (const key in validations) {
            await this.validate({ ...validations[key], key }, _.get(data, key))
        }
    }

    /*Check all validations types (required, value)*/
    async validate(validation, data) {
        this.checkRequired(validation, data)
        this.checkType(validation, data)
        this.checkRegexp(validation, data)
        this.checkEnum(validation, data)
        await this.checkAsyncMethods(validation, data)
        if (!this.options.disableReplaceFallbacks)
            this.replaceDataByFallbacks()
    }

    /*If the required option is true in validation, we check if data is not undefined*/
    checkRequired(validation, data) {
        if (!validation.required)
            return
        if (!validation.required.conditions && data === undefined)
            return this.throw(validation, 'required')
        else if (this.checkConditions(validation.required.conditions) && data === undefined)
            return this.throw(validation, 'required')
    }

    /*Check if value is in enum*/
    checkEnum(validation, data) {
        if (validation.enum && data && validation.enum.data.indexOf(data) === -1)
            this.throw(validation, 'enum', { validationInfo: `Value must be: ${validation.enum.data}` })
    }

    checkRegexp(validation, data) {
        if (!validation.regexp || !validation.regexp.data || !data)
            return

        if (!validation.regexp.data.exec(data))
            this.throw(validation, 'regexp', { validationInfo: `Regexp: ${validation.regexp.data}` })
    }

    checkType(validation, data) {
        if (!validation.type || !validation.type.data || !data)
            return false
        const type = validation.type.data.toLowerCase()
        
        const switchType = (type) => {
            switch(type) {

            case 'number':
                const int = parseInt(data)
                return typeof(int) === 'number' && !isNaN(int)

            case 'string':
                return typeof(data) === 'string'
            
            case 'array':
                return _.isArray(data)

            case 'object':
                return _.isObject(data)

            case 'boolean':
                return _.isBoolean(data)

            case 'date':
                return !isNaN(new Date(data).getTime())

            default: return true

            }
        }
        
        const isValid = switchType(type)
        if (!isValid) 
            this.throw(validation, 'type', { validationInfo: `${validation.key} attribute must be a ${type}` })
    }
    
    checkConditions(conditions, data) {
        if (!conditions)
            return false
        let result = false
        conditions.forEach(condition => {
            if (condition.values) {
                condition.values.forEach(value => {
                    if (_.get(this.data, condition.key) === value)
                        result = true
                })
            } else if (_.get(this.data, condition.key)) {
                result = true
            }
        })
        return result
    }

    async checkAsyncMethods(validation, data) {
        if (!validation.asyncMethods || !data)
            return
        const methods = validation.asyncMethods.filter(method => this[method.data])
        for (let method of methods) {
            try {
                const valid = await this[method.data](data, validation)
                if (!valid) {
                    const options = {}
                    if (method.error)
                        options.error = method.error
                    else if (method.warning)
                        options.warning = method.warning
                    this.throw(validation, 'asyncMethods', options)
                }
            } catch (err) {
                this.asyncMethodsErrors.push(err)
            }
        }
    }

    /*Fallbacks management*/
    replaceDataByFallbacks() {
        for (const i in this.fallbacks) {
            this.data[i] = this.fallbacks[i]
        }
    }

    /*****ERROR AND WARNING*****/
    
    /*Throw warning or error*/
    throw(validation, validationRule, options = {}) {
        if (validation[validationRule].warning || options.warning)
            return this.throwWarning(validation, validationRule, options)
        this.throwError(validation, validationRule, options)
    }

    /*Throw error*/
    throwError(validation, validationRule, options = {}) {
        const error = options.error || validation[validationRule].error
        if (error) {
            if (!error.validationInfo && options.validationInfo && !error.info)
                error.info = options.validationInfo
            if (this.isValid)
                this.error = this.options.mainError || error
            if (!_.get(this.errors, validation.key))
                _.set(this.errors, validation.key, [])
            _.get(this.errors, validation.key).push(error)
        }
        this.isValid = false
    }

    /*Throw warning*/
    throwWarning(validation, validationRule, options = {}) {
        const warning = options.warning || validation[validationRule].warning
        this.warnings.push(warning)
        const fallback = validation[validationRule].fallback || validation.fallback
        if (fallback)
            _.set(this.fallbacks, validation.key, fallback)
    }
}

module.exports = Validator