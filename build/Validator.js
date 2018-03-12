'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
        this.warnings = [];
        this.fallbacks = {};
        this.options = {};
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
                                return this.beforeValidate();

                            case 2:
                                _context.next = 4;
                                return this.makeValidations();

                            case 4:
                                _context.next = 6;
                                return this.afterValidate();

                            case 6:
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
                                    _context4.next = 9;
                                    break;
                                }

                                key = _context4.t1.value;

                                if (!this.isValid) {
                                    _context4.next = 7;
                                    break;
                                }

                                _context4.next = 7;
                                return this.validate((0, _extends3.default)({}, validations[key], { key: key }), _.get(data, key));

                            case 7:
                                _context4.next = 2;
                                break;

                            case 9:
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

            var haveDependence = this.haveDependence(validation.required);
            if (!haveDependence && data === undefined) return this.throw(validation, 'required');else if (haveDependence && this.isDependent(validation.required) && data === undefined) return this.throw(validation, 'required');
        }

        /*Check if value is in enum*/

    }, {
        key: 'checkEnum',
        value: function checkEnum(validation, data) {
            if (validation.enum && data && validation.enum.data.indexOf(data) === -1) this.throw(validation, 'enum', { validationInfo: 'The value must be: ' + validation.enum.data });
        }
    }, {
        key: 'checkRegexp',
        value: function checkRegexp(validation, data) {
            if (!validation.regexp || !validation.regexp.data || !this.isValid) return;

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
            if (!isValid) this.throw(validation, 'type', { validationInfo: 'The ' + validation.key + ' attribute must be a ' + type });
        }
    }, {
        key: 'haveDependence',
        value: function haveDependence(validation) {
            if (!validation.dependent || !validation.dependentValue && !validation.dependentValues) return false;
            return true;
        }
    }, {
        key: 'isDependent',
        value: function isDependent(validation, data) {
            var _this = this;

            if (!this.haveDependence(validation)) return false;

            var dependentValues = validation.dependentValues || [validation.dependentValue];
            var dependent = false;

            dependentValues.forEach(function (attribute) {
                if (_this.data[validation.dependent] === attribute) dependent = true;
            });

            return dependent;
        }
    }, {
        key: 'checkAsyncMethods',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(validation, data) {
                var _this2 = this;

                var methods, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, method, valid;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (validation.asyncMethods) {
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
                                    _context6.next = 19;
                                    break;
                                }

                                method = _step.value;
                                _context6.next = 12;
                                return this[method.data](data);

                            case 12:
                                valid = _context6.sent;

                                if (valid) {
                                    _context6.next = 16;
                                    break;
                                }

                                this.throw(validation, 'asyncMethods', { error: method.error });
                                return _context6.abrupt('break', 19);

                            case 16:
                                _iteratorNormalCompletion = true;
                                _context6.next = 8;
                                break;

                            case 19:
                                _context6.next = 25;
                                break;

                            case 21:
                                _context6.prev = 21;
                                _context6.t0 = _context6['catch'](6);
                                _didIteratorError = true;
                                _iteratorError = _context6.t0;

                            case 25:
                                _context6.prev = 25;
                                _context6.prev = 26;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 28:
                                _context6.prev = 28;

                                if (!_didIteratorError) {
                                    _context6.next = 31;
                                    break;
                                }

                                throw _iteratorError;

                            case 31:
                                return _context6.finish(28);

                            case 32:
                                return _context6.finish(25);

                            case 33:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[6, 21, 25, 33], [26,, 28, 32]]);
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

            if (validation[validationRule].warning) return this.throwWarning(validation, validationRule, options);
            this.throwError(validation, validationRule, options);
        }

        /*Throw error*/

    }, {
        key: 'throwError',
        value: function throwError(validation, validationRule) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.isValid = false;

            if (validation[validationRule].error) {
                if (!validation[validationRule].error.validationInfo && options.validationInfo) validation[validationRule].error.validationInfo = options.validationInfo;
                this.error = validation[validationRule].error;
            } else if (options.error) {
                this.error = options.error;
            }
        }

        /*Throw warning*/

    }, {
        key: 'throwWarning',
        value: function throwWarning(validation, validationRule) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.warnings.push(validation[validationRule].warning);
            var fallback = validation[validationRule].fallback || validation.fallback;
            if (fallback) this.fallbacks[validation.key] = fallback;
        }
    }]);
    return Validator;
}();

exports.default = Validator;