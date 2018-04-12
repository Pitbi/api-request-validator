const Validator = require('../../src/Validator')

const RULES = {
    email: {
        required: {
            error: {
                code: 422,
                err: 'user_registration_missing_email'
            }
        },
        regexp: {
            data: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/,
            error: {
                code: 422,
                err: 'user_registration_invalid_email'
            }
        },
        asyncMethods: [
            {
                data: 'isExistingEmail',
                error: {
                    code: 409,
                    err: 'user_registration_existing_email'
                }
            }
        ]
    },
    password: {
        required: {
            error: {
                code: 422,
                err: 'user_registration_missing_password'
            }
        },
        regexp: {
            data: /^[a-zA-Z0-9\-\u00E0-\u00FC]{6,}$/,
            error: {
                code: 422,
                err: 'user_registration_invalid_password'
            }
        }
    },
    gender: {
        enum: {
            data: ['male', 'female'],
            error: {
                code: 422,
                err: 'user_registration_unknown_gender'
            }
        }
    },
    comment: {
        type: {
            data: 'string',
            error: {
                code: 422,
                err: 'user_registration_invalid_type_comment'
            }
        }
    },
    age: {
        required: {
            conditions: [{
                key: 'gender',
                values: ['male']
            }],
            error: {
                code: 422,
                err: 'user_registration_missing_age'
            }
        }
    },
    'location.lat': {
        type: {
            data: 'number',
            error: {
                code: 422,
                err: 'user_registration_invalid_type_latitude'
            }
        },
        required: {
            conditions: [{
                key: 'location.lng'
            }],
            error: {
                code: 422,
                err: 'user_registration_missing_latitude'
            }
        }
    },
    'location.lng': {
        type: {
            data: 'number',
            error: {
                code: 422,
                err: 'user_registration_invalid_type_longitude'
            }
        },
        required: {
            conditions: [{
                key: 'location.lat'
            }],
            error: {
                code: 422,
                err: 'user_registration_missing_longitude'
            }
        }
    }
}

class UserRegistrationValidator extends Validator {
    constructor(payload) {
        super(RULES, payload)
    }

    async isExistingEmail(value) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value !== 'existing@mail.com')
            }, 200)
        })
    }
}

module.exports = UserRegistrationValidator