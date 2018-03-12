const _ = require('lodash')

class Validator {
    constructor(validations = {}, data = {}, options = {}) {
        //Set params to this
        this.validations = validations //Validations rules
        this.data = data //Data to validate
        //Default values
        this.isValid = true
        this.error = null
        this.warnings = []
        this.fallbacks = {}
        this.options = {}
    }

    async run () {
        await this.beforeValidate()
        await this.makeValidations()
        await this.afterValidate()
    }

    /***Hooks***/
    async beforeValidate() {
        return true
    }
    async afterValidate() {
        return true
    }

    /*****VALIDATIONS*****/
    /*Make validation: make all vadations*/
    async makeValidations() {
        const { validations, data } = this
        for (const key in validations) {
            if (this.isValid)
                await this.validate({ ...validations[key], key }, _.get(key))
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

        const haveDependence = this.haveDependence(validation.required)
        if (!haveDependence && data === undefined)
            return this.throw(validation, 'required')
        else if (haveDependence && this.isDependent(validation.required) && data === undefined)
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
            this.throw(validation, 'type', { validationInfo: `The ${validation.key} attribute must be a ${type}` })
    }

    haveDependence(validation) {
        if (!validation.dependent || (!validation.dependentValue && !validation.dependentValues))
            return false
        return true
    }

    isDependent(validation, data) {
        if (!this.haveDependence(validation))
            return false

        const dependentValues = validation.dependentValues || [validation.dependentValue]
        let dependent = false

        dependentValues.forEach(attribute => {
            if (this.data[validation.dependent] === attribute)
                dependent = true
        })
        
        return dependent
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

    /*Fallbacks management*/

    replaceDataByFallbacks() {
        for (const i in this.fallbacks) {
            this.data[i] = this.fallbacks[i]
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
        this.warnings.push(validation[validationRule].warning)
        const fallback = validation[validationRule].fallback || validation.fallback
        if (fallback)
            this.fallbacks[validation.key] = fallback
    }
}

export default Validator