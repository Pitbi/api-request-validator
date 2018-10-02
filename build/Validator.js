'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

var Validator = function () {
    function Validator() {
        var validations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        (0, _classCallCheck3.default)(this, Validator);

        //Set params to this
        this.validations = validations; //Validations rules
        this.data = data; //Data to validate
        //Default values
        this.isValid = true;
        this.error = null;
        this.errors = {};
        this.asyncMethodsErrors = [];
        this.warnings = [];
        this.fallbacks = {};
        this.options = options;
    }

    (0, _createClass3.default)(Validator, [{
        key: 'run',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.beforeValidate(this.data);

                            case 2:
                                this.filterPayload();
                                _context.next = 5;
                                return this.makeValidations();

                            case 5:
                                _context.next = 7;
                                return this.afterValidate(this.data);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function run() {
                return _ref.apply(this, arguments);
            }

            return run;
        }()

        /***Hooks***/

    }, {
        key: 'beforeValidate',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', true);

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function beforeValidate() {
                return _ref2.apply(this, arguments);
            }

            return beforeValidate;
        }()
    }, {
        key: 'afterValidate',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', true);

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function afterValidate() {
                return _ref3.apply(this, arguments);
            }

            return afterValidate;
        }()

        /*Filter payload*/

    }, {
        key: 'filterPayload',
        value: function filterPayload() {
            if (!this.options.filter) return;
            var keys = (0, _keys2.default)(this.validations);
            if (this.options.acceptedFilterKeys) keys = keys.concat(this.options.acceptedFilterKeys);
            for (var key in this.data) {
                if (!keys.includes(key)) delete this.data[key];
            }
        }

        /*****VALIDATIONS*****/
        /*Make validation: make all vadations*/

    }, {
        key: 'makeValidations',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var validations, data, key;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                validations = this.validations, data = this.data;
                                _context4.t0 = _regenerator2.default.keys(validations);

                            case 2:
                                if ((_context4.t1 = _context4.t0()).done) {
                                    _context4.next = 8;
                                    break;
                                }

                                key = _context4.t1.value;
                                _context4.next = 6;
                                return this.validate((0, _extends3.default)({}, validations[key], { key: key }), _.get(data, key));

                            case 6:
                                _context4.next = 2;
                                break;

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function makeValidations() {
                return _ref4.apply(this, arguments);
            }

            return makeValidations;
        }()

        /*Check all validations types (required, value)*/

    }, {
        key: 'validate',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(validation, data) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                this.checkRequired(validation, data);
                                this.checkType(validation, data);
                                this.checkRegexp(validation, data);
                                this.checkEnum(validation, data);
                                _context5.next = 6;
                                return this.checkAsyncMethods(validation, data);

                            case 6:
                                if (!this.options.disableReplaceFallbacks) this.replaceDataByFallbacks();

                            case 7:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function validate(_x4, _x5) {
                return _ref5.apply(this, arguments);
            }

            return validate;
        }()

        /*If the required option is true in validation, we check if data is not undefined*/

    }, {
        key: 'checkRequired',
        value: function checkRequired(validation, data) {
            if (!validation.required) return;
            if (!validation.required.conditions && data === undefined) return this.throw(validation, 'required');else if (this.checkConditions(validation.required.conditions) && data === undefined) return this.throw(validation, 'required');
        }

        /*Check if value is in enum*/

    }, {
        key: 'checkEnum',
        value: function checkEnum(validation, data) {
            if (validation.enum && data && validation.enum.data.indexOf(data) === -1) this.throw(validation, 'enum', { validationInfo: 'Value must be: ' + validation.enum.data });
        }
    }, {
        key: 'checkRegexp',
        value: function checkRegexp(validation, data) {
            if (!validation.regexp || !validation.regexp.data || !data) return;

            if (!validation.regexp.data.exec(data)) this.throw(validation, 'regexp', { validationInfo: 'Regexp: ' + validation.regexp.data });
        }
    }, {
        key: 'checkType',
        value: function checkType(validation, data) {
            if (!validation.type || !validation.type.data || !data) return false;
            var type = validation.type.data.toLowerCase();

            var switchType = function switchType(type) {
                switch (type) {

                    case 'number':
                        var int = parseInt(data);
                        return typeof int === 'number' && !isNaN(int);

                    case 'string':
                        return typeof data === 'string';

                    case 'array':
                        return _.isArray(data);

                    case 'object':
                        return _.isObject(data);

                    case 'boolean':
                        return _.isBoolean(data);

                    case 'date':
                        return !isNaN(new Date(data).getTime());

                    default:
                        return true;

                }
            };

            var isValid = switchType(type);
            if (!isValid) this.throw(validation, 'type', { validationInfo: validation.key + ' attribute must be a ' + type });
        }
    }, {
        key: 'checkConditions',
        value: function checkConditions(conditions, data) {
            var _this = this;

            if (!conditions) return false;
            var result = false;
            conditions.forEach(function (condition) {
                if (condition.values) {
                    condition.values.forEach(function (value) {
                        if (_.get(_this.data, condition.key) === value) result = true;
                    });
                } else if (_.get(_this.data, condition.key)) {
                    result = true;
                }
            });
            return result;
        }
    }, {
        key: 'checkAsyncMethods',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(validation, data) {
                var _this2 = this;

                var methods, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, method, valid, options;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!(!validation.asyncMethods || !data)) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return');

                            case 2:
                                methods = validation.asyncMethods.filter(function (method) {
                                    return _this2[method.data];
                                });
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context6.prev = 6;
                                _iterator = (0, _getIterator3.default)(methods);

                            case 8:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context6.next = 23;
                                    break;
                                }

                                method = _step.value;
                                _context6.prev = 10;
                                _context6.next = 13;
                                return this[method.data](data, validation);

                            case 13:
                                valid = _context6.sent;

                                if (!valid) {
                                    options = {};

                                    if (method.error) options.error = method.error;else if (method.warning) options.warning = method.warning;
                                    this.throw(validation, 'asyncMethods', options);
                                }
                                _context6.next = 20;
                                break;

                            case 17:
                                _context6.prev = 17;
                                _context6.t0 = _context6['catch'](10);

                                this.asyncMethodsErrors.push(_context6.t0);

                            case 20:
                                _iteratorNormalCompletion = true;
                                _context6.next = 8;
                                break;

                            case 23:
                                _context6.next = 29;
                                break;

                            case 25:
                                _context6.prev = 25;
                                _context6.t1 = _context6['catch'](6);
                                _didIteratorError = true;
                                _iteratorError = _context6.t1;

                            case 29:
                                _context6.prev = 29;
                                _context6.prev = 30;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 32:
                                _context6.prev = 32;

                                if (!_didIteratorError) {
                                    _context6.next = 35;
                                    break;
                                }

                                throw _iteratorError;

                            case 35:
                                return _context6.finish(32);

                            case 36:
                                return _context6.finish(29);

                            case 37:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[6, 25, 29, 37], [10, 17], [30,, 32, 36]]);
            }));

            function checkAsyncMethods(_x6, _x7) {
                return _ref6.apply(this, arguments);
            }

            return checkAsyncMethods;
        }()

        /*Fallbacks management*/

    }, {
        key: 'replaceDataByFallbacks',
        value: function replaceDataByFallbacks() {
            for (var i in this.fallbacks) {
                this.data[i] = this.fallbacks[i];
            }
        }

        /*****ERROR AND WARNING*****/

        /*Throw warning or error*/

    }, {
        key: 'throw',
        value: function _throw(validation, validationRule) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (validation[validationRule].warning || options.warning) return this.throwWarning(validation, validationRule, options);
            this.throwError(validation, validationRule, options);
        }

        /*Throw error*/

    }, {
        key: 'throwError',
        value: function throwError(validation, validationRule) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var error = options.error || validation[validationRule].error;
            if (error) {
                if (!error.validationInfo && options.validationInfo && !error.info) error.info = options.validationInfo;
                if (this.isValid) this.error = this.options.mainError || error;
                if (!_.get(this.errors, validation.key)) _.set(this.errors, validation.key, []);
                _.get(this.errors, validation.key).push(error);
            }
            this.isValid = false;
        }

        /*Throw warning*/

    }, {
        key: 'throwWarning',
        value: function throwWarning(validation, validationRule) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var warning = options.warning || validation[validationRule].warning;
            this.warnings.push(warning);
            var fallback = validation[validationRule].fallback || validation.fallback;
            if (fallback) _.set(this.fallbacks, validation.key, fallback);
        }
    }]);
    return Validator;
}();

module.exports = Validator;