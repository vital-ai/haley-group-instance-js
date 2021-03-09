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
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _section_api_section_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};




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
    GroupAPI.getValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType, vitaljs) {
        if (!vitaljs && !GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        var msgRL = (vitaljs || GroupAPI.vitaljs).resultList();
        (qaObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        (qaInstanceObjects || []).forEach(function (obj) { return msgRL.addResult(obj); });
        var _a = GroupAPI.getAnswerAndAnswerInstance({ answerType: answerType }, msgRL), answer = _a[0], answerInstance = _a[1];
        if (GroupAPI.logger)
            GroupAPI.logger.info('getting value from answerInstance: ', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    };
    GroupAPI.setValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType, value, vitaljs) {
        if (!vitaljs && !GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        var msgRL = (vitaljs || GroupAPI.vitaljs).resultList();
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
        var answers = msgRL.iterator(_util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = msgRL.iterator(_util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
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
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("textAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.get("booleanAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("choiceAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.get("dateTimeAnswerValue"));
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("longTextAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.get("fileAnswerValueURI");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.get("integerAnswerValue");
                    }
                    else {
                        return answerInstance.get("doubleAnswerValue");
                    }
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("multiChoiceAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.get("signatureAnswerValue");
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.get("taxonomyAnswerValue");
                    return taxonomy || "";
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
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
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("textAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.set("booleanAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("choiceAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.set("dateTimeAnswerValue", value));
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("longTextAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.set("fileAnswerValueURI", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.set("haleyAnswerDataType", value);
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.set("integerAnswerValue", value);
                    }
                    else {
                        return answerInstance.set("doubleAnswerValue", value);
                    }
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("multiChoiceAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.set("signatureAnswerValue", value);
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.set("taxonomyAnswerValue", value);
                    return taxonomy || "";
                case _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
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
    GroupAPI.prototype.getValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType) {
        return GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType, this.vitaljs);
    };
    GroupAPI.prototype.setValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType, value) {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, value, this.vitaljs);
    };
    GroupAPI.prototype.createQaInstanceObjects = function (qaObjects) {
        var createdQaInstances = [];
        // 1 get group and create groupInstance.
        var groups = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP; });
        if (groups.length !== 1) {
            if (groups.length === 0)
                throw new Error('Passed in qaObjects should includes 1 HaleyGroup object. No detected');
            throw new Error("More than on HaleyGroup object detected. Groups URI: " + groups.map(function (obj) { return obj.URI; }));
        }
        var group = groups[0];
        var groupInstance = this.createGroupInstance(group);
        createdQaInstances = __spreadArray([groupInstance], createdQaInstances);
        var edgeToSections = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE) === group.URI; });
        var edgeToSectionURIs = edgeToSections.map(function (obj) { return obj.URI; });
        var allSections = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SECTION; });
        var sections = edgeToSections.map(function (edge) {
            var findSections = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findSections.length) {
                throw new Error("Could not find the section object connected to edge " + edge.URI + ", sectionURI: " + edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION));
            }
            if (findSections.length > 1) {
                throw new Error("Multiple section objects connected to edge " + edge.URI + "}");
            }
            return findSections[0];
        });
        if (edgeToSections.length !== allSections.length) {
            throw new Error("Edge to section and section objects do not match. There are " + edgeToSections.length + " edges that connected to sectionObject, and there are " + allSections.length + " sectionObjects all together. ");
        }
        if (allSections.length !== sections.length) {
            throw new Error("Section object does not match. There are " + allSections.length + " section objects and only " + sections.length + " of then connected to the group object.");
        }
        var qaObjectsLeft = qaObjects.filter(function (obj) { return obj.URI !== group.URI || edgeToSectionURIs.includes(obj.URI); });
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var section = sections_1[_i];
            var _a = _section_api_section_api__WEBPACK_IMPORTED_MODULE_1__.SectionAPI.createQaInstanceObjects(this.vitaljs, section, qaObjectsLeft), sectionQaObjectsLeft = _a.qaObjectsLeft, createdInstances = _a.createdInstances, sectionInstance = _a.sectionInstance;
            qaObjectsLeft = sectionQaObjectsLeft;
            var edgeToSectionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(this.vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION_INSTANCE, groupInstance, sectionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToSectionInstance]), createdInstances);
        }
        // if (qaObjectsLeft.length !== 0) {
        //     throw new Error(`Some additional objects exist that are not in the qa-tree. Redundant objects: ${qaObjectsLeft.map(obj => obj.URI)}`);
        // }
        return createdQaInstances;
    };
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
        var answers = this.msgRL.iterator(_util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = this.msgRL.iterator(_util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
        }
        this.logger.info('get answerURI', answer === null || answer === void 0 ? void 0 : answer.URI);
        this.logger.info('get answerInstanceURI', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return [answer, answerInstance];
    };
    GroupAPI.prototype.createGroupInstance = function (group) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createVitalObject)(this.vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP_INSTANCE);
        obj.set(_util_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_GROUP, group.URI);
        return obj;
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
/* harmony export */   "TYPE_HALEY_GROUP": () => (/* binding */ TYPE_HALEY_GROUP),
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
/* harmony export */   "TYPE_HALEY_TEXT_ANSWER": () => (/* binding */ TYPE_HALEY_TEXT_ANSWER),
/* harmony export */   "TYPE_HALEY_BOOLEAN_ANSWER": () => (/* binding */ TYPE_HALEY_BOOLEAN_ANSWER),
/* harmony export */   "TYPE_HALEY_CHOICE_ANSWER": () => (/* binding */ TYPE_HALEY_CHOICE_ANSWER),
/* harmony export */   "TYPE_HALEY_DATE_TIME_ANSWER": () => (/* binding */ TYPE_HALEY_DATE_TIME_ANSWER),
/* harmony export */   "TYPE_HALEY_LONG_TEXT_ANSWER": () => (/* binding */ TYPE_HALEY_LONG_TEXT_ANSWER),
/* harmony export */   "TYPE_HALEY_FILE_UPLOAD_ANSWER": () => (/* binding */ TYPE_HALEY_FILE_UPLOAD_ANSWER),
/* harmony export */   "TYPE_HALEY_NUMBER_ANSWER": () => (/* binding */ TYPE_HALEY_NUMBER_ANSWER),
/* harmony export */   "TYPE_HALEY_MULTI_CHOICE_ANSWER": () => (/* binding */ TYPE_HALEY_MULTI_CHOICE_ANSWER),
/* harmony export */   "TYPE_HALEY_SIGNATURE_ANSWER": () => (/* binding */ TYPE_HALEY_SIGNATURE_ANSWER),
/* harmony export */   "TYPE_HALEY_TAXONOMY_ANSWER": () => (/* binding */ TYPE_HALEY_TAXONOMY_ANSWER),
/* harmony export */   "TYPE_HALEY_MULTI_TAXONOMY_ANSWER": () => (/* binding */ TYPE_HALEY_MULTI_TAXONOMY_ANSWER),
/* harmony export */   "MAPPING_ANSWER_TO_ANSWER_INSTANCE": () => (/* binding */ MAPPING_ANSWER_TO_ANSWER_INSTANCE),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_TYPE),
/* harmony export */   "SHORT_NAME_HALEY_ROW_TYPE_URI": () => (/* binding */ SHORT_NAME_HALEY_ROW_TYPE_URI),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_DATA_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_DATA_TYPE),
/* harmony export */   "SHORT_NAME_EDGE_SOURCE": () => (/* binding */ SHORT_NAME_EDGE_SOURCE),
/* harmony export */   "SHORT_NAME_EDGE_DESTINATION": () => (/* binding */ SHORT_NAME_EDGE_DESTINATION),
/* harmony export */   "SHORT_NAME_HALEY_GROUP": () => (/* binding */ SHORT_NAME_HALEY_GROUP),
/* harmony export */   "SHORT_NAME_HALEY_ROW": () => (/* binding */ SHORT_NAME_HALEY_ROW),
/* harmony export */   "SHORT_NAME_HALEY_QUESTION": () => (/* binding */ SHORT_NAME_HALEY_QUESTION),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER": () => (/* binding */ SHORT_NAME_HALEY_ANSWER),
/* harmony export */   "SHORT_NAME_HALEY_SECTION": () => (/* binding */ SHORT_NAME_HALEY_SECTION),
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
var TYPE_HALEY_GROUP = 'http://vital.ai/ontology/haley-ai-question#HaleyGroup';
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
var TYPE_HALEY_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer';
var TYPE_HALEY_BOOLEAN_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswer';
var TYPE_HALEY_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer';
var TYPE_HALEY_DATE_TIME_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswer';
var TYPE_HALEY_LONG_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswer';
var TYPE_HALEY_FILE_UPLOAD_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswer';
var TYPE_HALEY_NUMBER_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer';
var TYPE_HALEY_MULTI_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer';
var TYPE_HALEY_SIGNATURE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswer';
var TYPE_HALEY_TAXONOMY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswer';
var TYPE_HALEY_MULTI_TAXONOMY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswer';
var MAPPING_ANSWER_TO_ANSWER_INSTANCE = new Map([
    [TYPE_HALEY_TEXT_ANSWER, TYPE_HALEY_TEXT_ANSWER_INSTANCE],
    [TYPE_HALEY_BOOLEAN_ANSWER, TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE],
    [TYPE_HALEY_CHOICE_ANSWER, TYPE_HALEY_CHOICE_ANSWER_INSTANCE],
    [TYPE_HALEY_DATE_TIME_ANSWER, TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE],
    [TYPE_HALEY_LONG_TEXT_ANSWER, TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE],
    [TYPE_HALEY_FILE_UPLOAD_ANSWER, TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE],
    [TYPE_HALEY_NUMBER_ANSWER, TYPE_HALEY_NUMBER_ANSWER_INSTANCE],
    [TYPE_HALEY_MULTI_CHOICE_ANSWER, TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE],
    [TYPE_HALEY_SIGNATURE_ANSWER, TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE],
    [TYPE_HALEY_TAXONOMY_ANSWER, TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE],
    [TYPE_HALEY_MULTI_TAXONOMY_ANSWER, TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE],
]);
var SHORT_NAME_HALEY_ANSWER_TYPE = 'haleyAnswerType';
var SHORT_NAME_HALEY_ROW_TYPE_URI = 'haleyRowTypeURI';
var SHORT_NAME_HALEY_ANSWER_DATA_TYPE = 'haleyAnswerDataType';
var SHORT_NAME_EDGE_SOURCE = 'edgeSource';
var SHORT_NAME_EDGE_DESTINATION = 'edgeDestination';
// GroupInstance
var SHORT_NAME_HALEY_GROUP = 'haleyGroup';
var SHORT_NAME_HALEY_ROW = 'haleyRow';
var SHORT_NAME_HALEY_QUESTION = 'haleyQuestion';
var SHORT_NAME_HALEY_ANSWER = 'haleyAnswer';
var SHORT_NAME_HALEY_SECTION = 'haleySection';
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SectionAPI": () => (/* binding */ SectionAPI)
/* harmony export */ });
/* harmony import */ var _question_api_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _row_api_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};




var SectionAPI = /** @class */ (function () {
    function SectionAPI() {
    }
    SectionAPI.createQaInstanceObjects = function (vitaljs, section, qaObjects) {
        var createdQaInstances = [];
        var sectionInstance = this.createSectionInstance(vitaljs, section);
        createdQaInstances = __spreadArray([sectionInstance], createdQaInstances);
        var edgeToQuestions = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_2__.EDGE_QUESTION && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_SOURCE) === section.URI; });
        var edgeToQuestionURIs = edgeToQuestions.map(function (obj) { return obj.URI; });
        var questions = edgeToQuestions.map(function (edge) {
            var findQuestions = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findQuestions.length) {
                throw new Error("Could not find the question object connected to edge " + edge.URI + ", questionURI: " + edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION));
            }
            if (findQuestions.length > 1) {
                throw new Error("Multiple question objects connected to edge " + edge.URI + "}");
            }
            return findQuestions[0];
        });
        var qaObjectsLeft = qaObjects.filter(function (obj) { return obj.URI !== section.URI && !edgeToQuestionURIs.includes(obj.URI); });
        for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
            var question = questions_1[_i];
            var _a = _question_api_index__WEBPACK_IMPORTED_MODULE_0__.QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft), questionQaObjectsLeft = _a.qaObjectsLeft, createdInstances = _a.createdInstances, questionInstance = _a.questionInstance;
            qaObjectsLeft = questionQaObjectsLeft;
            var edgeToQuestionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createEdgeObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_2__.EDGE_QUESTION_INSTANCE, sectionInstance, questionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToQuestionInstance]), createdInstances);
        }
        var edgeToRows = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_2__.EDGE_ROW && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_SOURCE) === section.URI; });
        var edgeToRowURIs = edgeToRows.map(function (obj) { return obj.URI; });
        var rows = edgeToRows.map(function (edge) {
            var rowURI = edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION);
            var findRows = qaObjects.filter(function (obj) { return obj.URI === rowURI; });
            if (!findRows.length) {
                throw new Error("Could not find the row object connected to edge " + edge.URI + ", rowURI " + rowURI);
            }
            if (findRows.length > 1) {
                throw new Error("Multiple row objects connected to edge " + edge.URI + "}");
            }
            return findRows[0];
        });
        qaObjectsLeft = qaObjectsLeft.filter(function (obj) { return !edgeToRowURIs.includes(obj.URI); });
        for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
            var row = rows_1[_b];
            var _c = _row_api_index__WEBPACK_IMPORTED_MODULE_1__.RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, 1), rowQaObjectsLeft = _c.qaObjectsLeft, createdInstances = _c.createdInstances, rowInstance = _c.rowInstance;
            qaObjectsLeft = rowQaObjectsLeft;
            var edgeToRowInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createEdgeObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_2__.EDGE_ROW_INSTANCE, sectionInstance, rowInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToRowInstance]), createdInstances);
        }
        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            sectionInstance: sectionInstance,
        };
    };
    SectionAPI.createSectionInstance = function (vitaljs, section) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createVitalObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_2__.TYPE_HALEY_SECTION_INSTANCE);
        obj.set(_util_constant__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_HALEY_SECTION, section.URI);
        return obj;
    };
    return SectionAPI;
}());



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuestionAPI": () => (/* binding */ QuestionAPI)
/* harmony export */ });
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


var QuestionAPI = /** @class */ (function () {
    function QuestionAPI() {
    }
    QuestionAPI.createQuestionInstance = function (vitaljs, question) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createVitalObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_QUESTION_INSTANCE);
        obj.set(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_QUESTION, question.URI);
        return obj;
    };
    QuestionAPI.createAnswerInstance = function (vitaljs, answer) {
        var instanceType = _util_constant__WEBPACK_IMPORTED_MODULE_1__.MAPPING_ANSWER_TO_ANSWER_INSTANCE.get(answer.type);
        if (!instanceType) {
            throw new Error("No instanceType mapping for answerType: " + answer.type);
        }
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createVitalObject)(vitaljs, instanceType);
        obj.set(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ANSWER, answer.URI);
        return obj;
    };
    QuestionAPI.createQaInstanceObjects = function (vitaljs, question, qaObjects) {
        var questionInstance = QuestionAPI.createQuestionInstance(vitaljs, question);
        var edgeToAnswers = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === question.URI; });
        var edgeToAnswerURIs = edgeToAnswers.map(function (obj) { return obj.URI; });
        var answerURIs = edgeToAnswers.map(function (edge) { return edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var answers = qaObjects.filter(function (obj) { return answerURIs.includes(obj.URI); });
        if (edgeToAnswers.length === 0 || answers.length === 0) {
            throw new Error("Question " + question.URI + " does not have any connected answer object. EdgeToAnswer=" + edgeToAnswers + ", answer=" + answers);
        }
        if (edgeToAnswers.length !== 1 || answers.length !== 1) {
            throw new Error("Question " + question.URI + " have multiple answers connected. EdgeToAnswer=" + edgeToAnswers + ", answer=" + answers);
        }
        var qaObjectsLeft = qaObjects.filter(function (obj) { return obj.URI !== question.URI && !edgeToAnswerURIs.includes(obj.URI) && !answerURIs.includes(obj.URI); });
        var answerInstance = QuestionAPI.createAnswerInstance(vitaljs, answers[0]);
        var edgeToAnswerInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createEdgeObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER_INSTANCE, questionInstance, answerInstance);
        return {
            createdInstances: [questionInstance, edgeToAnswerInstance, answerInstance],
            questionInstance: questionInstance,
            qaObjectsLeft: qaObjectsLeft,
        };
    };
    return QuestionAPI;
}());



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVitalObject": () => (/* binding */ createVitalObject),
/* harmony export */   "createEdgeObject": () => (/* binding */ createEdgeObject)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * Create vital Object based on the type given
 * @param type {String} type of graphObject
 * @return a GraphObject
 */
var createVitalObject = function (vitaljs, type) {
    if (!type) {
        console.error("Argument type is not pass in", type);
    }
    var parts = type.split('#');
    if (parts.length != 2 || !parts[1]) {
        console.error("This function could not support this type of objects creation", type, parts);
    }
    var obj = vitaljs.graphObject({ type: type });
    obj.URI = 'http://vital.ai/haley.ai/haley-saas/' + parts[1] + '/' + new Date().getTime() + '-' + Math.round(100000000000 * Math.random());
    return obj;
};
var createEdgeObject = function (vitaljs, type, source, destination) {
    var edge = createVitalObject(vitaljs, type);
    if (source) {
        edge.set(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE, (source === null || source === void 0 ? void 0 : source.URI) || null);
    }
    if (destination) {
        edge.set(_constant__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION, (destination === null || destination === void 0 ? void 0 : destination.URI) || null);
    }
    return edge;
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowAPI": () => (/* binding */ RowAPI)
/* harmony export */ });
/* harmony import */ var _question_api_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _util_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};



var RowAPI = /** @class */ (function () {
    function RowAPI() {
    }
    RowAPI.createRowInstance = function (vitaljs, row) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createVitalObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW_INSTANCE);
        obj.set(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW, row.URI);
        return obj;
    };
    RowAPI.createQaInstanceObjects = function (vitaljs, row, qaObjects, level) {
        if (level === void 0) { level = 1; }
        var createdQaInstances = [];
        var rowInstance = this.createRowInstance(vitaljs, row);
        createdQaInstances = __spreadArray([rowInstance], createdQaInstances);
        var edgeToQuestions = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
        var edgeToQuestionURIs = edgeToQuestions.map(function (obj) { return obj.URI; });
        var questions = edgeToQuestions.map(function (edge) {
            var findQuestions = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findQuestions.length) {
                throw new Error("Could not find the question object connected to edge " + edge.URI + ", questionURI: " + edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION));
            }
            if (findQuestions.length > 1) {
                throw new Error("Multiple question objects connected to edge " + edge.URI + "}");
            }
            return findQuestions[0];
        });
        var qaObjectsLeft = qaObjects.filter(function (obj) { return obj.URI !== row.URI && !edgeToQuestionURIs.includes(obj.URI); });
        for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
            var question = questions_1[_i];
            var _a = _question_api_index__WEBPACK_IMPORTED_MODULE_0__.QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft), questionQaObjectsLeft = _a.qaObjectsLeft, createdInstances = _a.createdInstances, questionInstance = _a.questionInstance;
            qaObjectsLeft = questionQaObjectsLeft;
            var edgeToQuestionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION_INSTANCE, rowInstance, questionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToQuestionInstance]), createdInstances);
        }
        if (level <= RowAPI.maxLevel) {
            var edgeToRows = qaObjects.filter(function (obj) { return obj.type === _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW && obj.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
            var edgeToRowURIs_1 = edgeToRows.map(function (obj) { return obj.URI; });
            var rows = edgeToRows.map(function (edge) {
                var rowURI = edge.get(_util_constant__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION);
                var findRows = qaObjects.filter(function (obj) { return obj.URI === rowURI; });
                if (!findRows.length) {
                    throw new Error("Could not find the row object connected to edge " + edge.URI + ", rowURI " + rowURI);
                }
                if (findRows.length > 1) {
                    throw new Error("Multiple row objects connected to edge " + edge.URI + "}");
                }
                return findRows[0];
            });
            qaObjectsLeft = qaObjectsLeft.filter(function (obj) { return !edgeToRowURIs_1.includes(obj.URI); });
            for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
                var row_1 = rows_1[_b];
                var _c = RowAPI.createQaInstanceObjects(vitaljs, row_1, qaObjectsLeft, level + 1), rowQaObjectsLeft = _c.qaObjectsLeft, createdInstances = _c.createdInstances, secondLevelRowInstance = _c.rowInstance;
                qaObjectsLeft = rowQaObjectsLeft;
                var edgeToRowInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(vitaljs, _util_constant__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, rowInstance, secondLevelRowInstance);
                createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToRowInstance]), createdInstances);
            }
        }
        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            rowInstance: rowInstance,
        };
    };
    // 1 means row will not have another connected to it, 2 means it will handle row->row case, 3 means row->row->row case.
    RowAPI.maxLevel = 2;
    return RowAPI;
}());



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