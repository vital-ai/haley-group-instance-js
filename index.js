(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var GroupAPI = __webpack_require__(1).GroupAPI;
// const GroupListWidget = require('./group-instance-list/group-list-widget');
// const GroupInstanceWidget = require('./group-instance/group-instance-widget');
// const QuestionModule = require('./questions/question-module');
module.exports = {
    GroupAPI: GroupAPI,
    // GroupListWidget,
    // GroupInstanceWidget,
    // QuestionModule,
};


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupAPI": () => (/* binding */ GroupAPI)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var GroupAPI = /** @class */ (function () {
    function GroupAPI(vitaljs, logger) {
        GroupAPI.logger = logger;
        if (!GroupAPI.vitaljs) {
            GroupAPI.vitaljs = vitaljs;
        }
        else if (GroupAPI.logger) {
            GroupAPI.logger.info('vitaljs has already been initialized');
        }
        this.logger = logger;
        this.vitaljs = vitaljs || GroupAPI.vitaljs;
        this.msgRL = vitaljs.resultList();
    }
    GroupAPI.getValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType) {
        if (!GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        var msgRL = GroupAPI.vitaljs.resultList();
        (qaObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        (qaInstanceObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        var _a = GroupAPI.getAnswerAndAnswerInstance({ answerType: answerType }, msgRL), answer = _a[0], answerInstance = _a[1];
        if (GroupAPI.logger)
            GroupAPI.logger.info('getting value from answerInstance: ', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    };
    GroupAPI.setValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType, value) {
        if (!GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        var msgRL = GroupAPI.vitaljs.resultList();
        (qaObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        (qaInstanceObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        var _a = GroupAPI.getAnswerAndAnswerInstance({ answerType: answerType }, msgRL), answer = _a[0], answerInstance = _a[1];
        if (GroupAPI.logger)
            GroupAPI.logger.info("setting value " + value + " for instance: ", answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        GroupAPI.setAnswerValue(answerInstance, answer, value);
        return answerInstance;
    };
    GroupAPI.getAnswerAndAnswerInstance = function (getValueProp, msgRL) {
        var rowType = getValueProp.rowType, rowCounter = getValueProp.rowCounter, answerType = getValueProp.answerType;
        var answers = msgRL.iterator(_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = msgRL.iterator(_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
        }
        if (GroupAPI.logger)
            GroupAPI.logger.info('get answerURI', answer === null || answer === void 0 ? void 0 : answer.URI);
        if (GroupAPI.logger)
            GroupAPI.logger.info('get answerInstanceURI', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return [answer, answerInstance];
    };
    GroupAPI.getAnswerValue = function (answerInstance, answerObj) {
        // console.log('_getAnswerValue');
        if (answerInstance) {
            switch (answerInstance.type) {
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("textAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.get("booleanAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("choiceAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.get("dateTimeAnswerValue"));
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("longTextAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.get("fileAnswerValueURI");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.get("integerAnswerValue");
                    }
                    else {
                        return answerInstance.get("doubleAnswerValue");
                    }
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("multiChoiceAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.get("signatureAnswerValue");
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.get("taxonomyAnswerValue");
                    return taxonomy || "";
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomies = answerInstance.get("multiTaxonomyAnswerValue");
                    taxonomies = taxonomies ? taxonomies : [];
                    return taxonomies.toString();
                default:
                    console.error("No such questionType exists", answerInstance);
            }
        }
        return null;
    };
    ;
    GroupAPI.setAnswerValue = function (answerInstance, answerObj, value) {
        // console.log('_getAnswerValue');
        if (answerInstance) {
            switch (answerInstance.type) {
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("textAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.set("booleanAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("choiceAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.set("dateTimeAnswerValue", value));
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("longTextAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.set("fileAnswerValueURI", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.set("haleyAnswerDataType", value);
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.set("integerAnswerValue", value);
                    }
                    else {
                        return answerInstance.set("doubleAnswerValue", value);
                    }
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("multiChoiceAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.set("signatureAnswerValue", value);
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.set("taxonomyAnswerValue", value);
                    return taxonomy || "";
                case _constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomies = answerInstance.set("multiTaxonomyAnswerValue", value);
                    taxonomies = taxonomies ? taxonomies : [];
                    return taxonomies.toString();
                default:
                    console.error("No such questionType exists", answerInstance);
            }
        }
        return null;
    };
    ;
    GroupAPI.prototype.setValue = function (setValueProp) {
        var value = setValueProp.value;
        var _a = this.getAnswerAndAnswerInstance(setValueProp), answer = _a[0], answerInstance = _a[1];
        this.logger.info("setting value " + value + " for instance: ", answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        GroupAPI.setAnswerValue(answerInstance, answer, value);
        return answerInstance;
    };
    GroupAPI.prototype.getValue = function (getValueProp) {
        var _a = this.getAnswerAndAnswerInstance(getValueProp), answer = _a[0], answerInstance = _a[1];
        this.logger.info('getting value from answerInstance: ', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    };
    GroupAPI.prototype.getAll = function () {
        return this.msgRL.iterator();
    };
    GroupAPI.prototype.getAnswerAndAnswerInstance = function (getValueProp) {
        var rowType = getValueProp.rowType, rowCounter = getValueProp.rowCounter, answerType = getValueProp.answerType;
        var answers = this.msgRL.iterator(_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = this.msgRL.iterator(_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
        }
        this.logger.info('get answerURI', answer === null || answer === void 0 ? void 0 : answer.URI);
        this.logger.info('get answerInstanceURI', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return [answer, answerInstance];
    };
    return GroupAPI;
}());



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPE_HALEY_SECTION": () => (/* binding */ TYPE_HALEY_SECTION),
/* harmony export */   "TYPE_HALEY_ROW": () => (/* binding */ TYPE_HALEY_ROW),
/* harmony export */   "TYPE_HALEY_QUESTION": () => (/* binding */ TYPE_HALEY_QUESTION),
/* harmony export */   "TYPE_HALEY_ANSWER": () => (/* binding */ TYPE_HALEY_ANSWER),
/* harmony export */   "TYPE_HALEY_GROUP_INSTANCE": () => (/* binding */ TYPE_HALEY_GROUP_INSTANCE),
/* harmony export */   "TYPE_HALEY_SECTION_INSTANCE": () => (/* binding */ TYPE_HALEY_SECTION_INSTANCE),
/* harmony export */   "TYPE_HALEY_ROW_INSTANCE": () => (/* binding */ TYPE_HALEY_ROW_INSTANCE),
/* harmony export */   "TYPE_HALEY_QUESTION_INSTANCE": () => (/* binding */ TYPE_HALEY_QUESTION_INSTANCE),
/* harmony export */   "TYPE_HALEY_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_ANSWER_OPTION": () => (/* binding */ TYPE_HALEY_ANSWER_OPTION),
/* harmony export */   "TYPE_HALEY_DEFAULT_ANSWER": () => (/* binding */ TYPE_HALEY_DEFAULT_ANSWER),
/* harmony export */   "TYPE_HALEY_TAXONOMY": () => (/* binding */ TYPE_HALEY_TAXONOMY),
/* harmony export */   "TYPE_HALEY_TEXT_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_TEXT_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_CHOICE_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_CHOICE_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_NUMBER_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_NUMBER_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE),
/* harmony export */   "TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE": () => (/* binding */ TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_TYPE),
/* harmony export */   "SHORT_NAME_HALEY_ROW_TYPE_URI": () => (/* binding */ SHORT_NAME_HALEY_ROW_TYPE_URI),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_DATA_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_DATA_TYPE),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER": () => (/* binding */ SHORT_NAME_HALEY_ANSWER),
/* harmony export */   "EDGE_GROUP_INSTANCE": () => (/* binding */ EDGE_GROUP_INSTANCE),
/* harmony export */   "EDGE_SECTION": () => (/* binding */ EDGE_SECTION),
/* harmony export */   "EDGE_ROW": () => (/* binding */ EDGE_ROW),
/* harmony export */   "EDGE_QUESTION": () => (/* binding */ EDGE_QUESTION),
/* harmony export */   "EDGE_ANSWER": () => (/* binding */ EDGE_ANSWER),
/* harmony export */   "EDGE_SECTION_INSTANCE": () => (/* binding */ EDGE_SECTION_INSTANCE),
/* harmony export */   "EDGE_ROW_INSTANCE": () => (/* binding */ EDGE_ROW_INSTANCE),
/* harmony export */   "EDGE_QUESTION_INSTANCE": () => (/* binding */ EDGE_QUESTION_INSTANCE),
/* harmony export */   "EDGE_ANSWER_INSTANCE": () => (/* binding */ EDGE_ANSWER_INSTANCE),
/* harmony export */   "EDGE_ANSWER_OPTION": () => (/* binding */ EDGE_ANSWER_OPTION),
/* harmony export */   "EDGE_ANSWER_OPTION_VALUE_DEPENDENCY": () => (/* binding */ EDGE_ANSWER_OPTION_VALUE_DEPENDENCY),
/* harmony export */   "EDGE_ANSWER_OPTION_DEPENDENCY": () => (/* binding */ EDGE_ANSWER_OPTION_DEPENDENCY),
/* harmony export */   "EDGE_QUESTION_DEPENDENCY": () => (/* binding */ EDGE_QUESTION_DEPENDENCY),
/* harmony export */   "EDGE_TAXONOMY": () => (/* binding */ EDGE_TAXONOMY),
/* harmony export */   "EDGE_ENHANCEMENT_RULE_DEPENDENCY": () => (/* binding */ EDGE_ENHANCEMENT_RULE_DEPENDENCY),
/* harmony export */   "EDGE_DEFAULT_ANSWER": () => (/* binding */ EDGE_DEFAULT_ANSWER)
/* harmony export */ });
var TYPE_HALEY_SECTION = 'http://vital.ai/ontology/haley-ai-question#HaleySection';
var TYPE_HALEY_ROW = 'http://vital.ai/ontology/haley-ai-question#HaleyRow';
var TYPE_HALEY_QUESTION = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestion';
var TYPE_HALEY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswer';
var TYPE_HALEY_GROUP_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance';
var TYPE_HALEY_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySectionInstance';
var TYPE_HALEY_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyRowInstance';
var TYPE_HALEY_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance';
var TYPE_HALEY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance';
var TYPE_HALEY_ANSWER_OPTION = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption';
var TYPE_HALEY_DEFAULT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyDefaultAnswer';
var TYPE_HALEY_TAXONOMY = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomy';
var TYPE_HALEY_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance';
var TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswerInstance';
var TYPE_HALEY_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance';
var TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswerInstance';
var TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswerInstance';
var TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswerInstance';
var TYPE_HALEY_NUMBER_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswerInstance';
var TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswerInstance';
var TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswerInstance';
var TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswerInstance';
var TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswerInstance';
var SHORT_NAME_HALEY_ANSWER_TYPE = 'haleyAnswerType';
var SHORT_NAME_HALEY_ROW_TYPE_URI = 'haleyRowTypeURI';
var SHORT_NAME_HALEY_ANSWER_DATA_TYPE = 'haleyAnswerDataType';
var SHORT_NAME_HALEY_ANSWER = 'haleyAnswer';
var EDGE_GROUP_INSTANCE = "http://vital.ai/ontology/haley-ai-question#Edge_hasGroupInstance";
var EDGE_SECTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSection';
var EDGE_ROW = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRow';
var EDGE_QUESTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion';
var EDGE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer';
var EDGE_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance';
var EDGE_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance';
var EDGE_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance';
var EDGE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance';
var EDGE_ANSWER_OPTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption';
var EDGE_ANSWER_OPTION_VALUE_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionValueDependency';
var EDGE_ANSWER_OPTION_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionDependency';
var EDGE_QUESTION_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionDependency';
var EDGE_TAXONOMY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasTaxonomy';
var EDGE_ENHANCEMENT_RULE_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleDependency';
var EDGE_DEFAULT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasDefaultAnswer';


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});