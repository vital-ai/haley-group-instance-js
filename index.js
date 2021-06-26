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
/* harmony import */ var _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _section_api_section_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _row_api_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _util_mapping_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _graph_container_group_graph_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _graph_container_group_instance_graph_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _graph_container_general_graph_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};








var GroupAPI = /** @class */ (function () {
    function GroupAPI(vitaljs, logger) {
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
        var answers = msgRL.iterator(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = msgRL.iterator(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
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
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("textAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.get("booleanAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("choiceAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.get("dateTimeAnswerValue"));
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("longTextAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.get("fileAnswerValueURI");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.get("integerAnswerValue");
                    }
                    else {
                        return answerInstance.get("doubleAnswerValue");
                    }
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("multiChoiceAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.get("signatureAnswerValue");
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.get("taxonomyAnswerValue");
                    return taxonomy || "";
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
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
        var followupType = value === null ? _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_FOLLOWUP_NO_ANSWER : _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_FOLLOWUP_FIRM_ANSWER;
        if (answerInstance) {
            answerInstance.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_FOLLOWUP_TYPE, followupType);
            switch (answerInstance.type) {
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("textAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.set("booleanAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("choiceAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.set("dateTimeAnswerValue", value));
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("longTextAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.set("fileAnswerValueURI", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        if (value !== null && !Number.isInteger(value)) {
                            throw new Error("The passed value should be an integer for and answer with HaleyIntegerDataType datatype. value: " + value + ", answer: " + JSON.stringify(answer) + ", answerInstance: " + JSON.stringify(answerInstance));
                        }
                        return answerInstance.set("integerAnswerValue", value);
                    }
                    else {
                        return answerInstance.set("doubleAnswerValue", value);
                    }
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("multiChoiceAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.set("signatureAnswerValue", value);
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.set("taxonomyAnswerValue", value);
                    return taxonomy || "";
                case _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
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
    GroupAPI.prototype.createVitalObject = function (vitaljs, type, properties) {
        if (properties === void 0) { properties = {}; }
        return (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createVitalObject)(vitaljs, type, properties);
    };
    GroupAPI.prototype.getValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType) {
        return GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType, this.vitaljs);
    };
    GroupAPI.prototype.setValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType, value) {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, value, this.vitaljs);
    };
    GroupAPI.prototype.resetValueByAnswerType = function (qaObjects, qaInstanceObjects, answerType) {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, null, this.vitaljs);
    };
    GroupAPI.prototype.getValueByAnswerTypeInsideRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.getAnswerValue(answerInstance, answer);
    };
    GroupAPI.prototype.setValueByAnswerTypeInsideRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType, value) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.setAnswerValue(answerInstance, answer, value);
    };
    GroupAPI.prototype.resetValueByAnswerTypeInsideRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.setAnswerValue(answerInstance, answer, null);
    };
    GroupAPI.prototype.getValueByAnswerTypeInsideRowRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.getAnswerValue(answerInstance, answer);
    };
    GroupAPI.prototype.setValueByAnswerTypeInsideRowRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType, value) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.setAnswerValue(answerInstance, answer, value);
    };
    GroupAPI.prototype.resetValueByAnswerTypeInsideRowRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType) {
        var _a = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType), answer = _a[0], answerInstance = _a[1];
        return GroupAPI.setAnswerValue(answerInstance, answer, null);
    };
    GroupAPI.prototype.getRowInstanceCountersByRowType = function (qaObjects, qaInstanceObjects, rowType) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowType);
    };
    GroupAPI.prototype.getRowRowInstanceCountersByRowRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
    };
    // created the rowInstance objects to be added to qaInstanceObjects;
    GroupAPI.prototype.createRowQaInstancesByRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.createRowQaInstancesByRowType(this.vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
    };
    GroupAPI.prototype.addRowQaInstancesByRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter) {
        var instances = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.createRowQaInstancesByRowType(this.vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
        instances.forEach(function (ins) { return qaInstanceObjects.push(ins); });
        return qaInstanceObjects;
    };
    // remove the rowInstance objects form qaInstanceObjects and return the updated 
    GroupAPI.prototype.removeRowQaInstancesByRowTypeAndInstanceCounter = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.removeRowQaInstancesByRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
    };
    GroupAPI.prototype.createRowRowQaInstancesByRowType = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.createRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
    };
    GroupAPI.prototype.addRowRowQaInstancesByRowType = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter) {
        var instances = _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.createRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
        instances.forEach(function (ins) { return qaInstanceObjects.push(ins); });
        return qaInstanceObjects;
    };
    GroupAPI.prototype.removeRowRowQaInstancesByRowTypeAndInstanceCounter = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.removeRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
    };
    GroupAPI.prototype.updateRowInstanceCounterByRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, counter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.updateRowInstanceCounterByRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, counter);
    };
    GroupAPI.prototype.updateRowRowInstanceCountersByRowRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter, counter) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.updateRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter, counter);
    };
    GroupAPI.prototype.createQaInstanceObjects = function (qaObjects, withRow, option) {
        if (withRow === void 0) { withRow = false; }
        if (option === void 0) { option = {}; }
        var createdQaInstances = [];
        // 1 get group and create groupInstance.
        var groups = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP; });
        if (groups.length !== 1) {
            if (groups.length === 0)
                throw new Error('Passed in qaObjects should includes 1 HaleyGroup object. No detected');
            throw new Error("More than on HaleyGroup object detected. Groups URI: " + groups.map(function (obj) { return obj.URI; }));
        }
        var group = groups[0];
        if (option.groupInstance)
            option.groupInstance.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_GROUP, group.URI);
        var groupInstance = option.groupInstance || this.createGroupInstance(group);
        createdQaInstances = __spreadArray([groupInstance], createdQaInstances);
        var edgeToSections = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE) === group.URI; });
        var edgeToSectionURIs = edgeToSections.map(function (obj) { return obj.URI; });
        var allSections = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_SECTION; });
        var sections = edgeToSections.map(function (edge) {
            var findSections = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findSections.length) {
                throw new Error("Could not find the section object connected to edge " + edge.URI + ", sectionURI: " + edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION));
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
            var _a = _section_api_section_api__WEBPACK_IMPORTED_MODULE_1__.SectionAPI.createQaInstanceObjects(this.vitaljs, section, qaObjectsLeft, withRow), sectionQaObjectsLeft = _a.qaObjectsLeft, createdInstances = _a.createdInstances, sectionInstance = _a.sectionInstance;
            qaObjectsLeft = sectionQaObjectsLeft;
            var edgeToSectionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createEdgeObject)(this.vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION_INSTANCE, groupInstance, sectionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToSectionInstance]), createdInstances);
        }
        // if (qaObjectsLeft.length !== 0) {
        //     throw new Error(`Some additional objects exist that are not in the qa-tree. Redundant objects: ${qaObjectsLeft.map(obj => obj.URI)}`);
        // }
        return createdQaInstances;
    };
    GroupAPI.prototype.getRowTypes = function (qaObjects) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getRowTypes(qaObjects);
    };
    GroupAPI.prototype.getRowTypesInRow = function (qaObjects, rowType) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.getRowTypesInRow(qaObjects, rowType);
    };
    GroupAPI.prototype.generateRowInstanceCounter = function (index) {
        return _row_api_index__WEBPACK_IMPORTED_MODULE_2__.RowAPI.generateRowInstanceCounter(index);
    };
    GroupAPI.prototype.splitGroupAndInstances = function (qaObjects) {
        var groupContainers = [];
        var groupInstanceContainers = [];
        var mappingUtil = new _util_mapping_util__WEBPACK_IMPORTED_MODULE_4__.MappingUtil(qaObjects);
        var groups = mappingUtil.getObjectsByType(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP);
        var groupInstances = mappingUtil.getObjectsByType(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP_INSTANCE);
        var matched = new Map();
        // initialized graph containers.
        groupInstances.forEach(function (groupInstance) {
            var graph = [];
            (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.buildQaGraph)(groupInstance, graph, mappingUtil);
            var container = new _graph_container_group_instance_graph_container__WEBPACK_IMPORTED_MODULE_6__.GroupInstanceGraphContainer(graph, groupInstance);
            groupInstanceContainers.push(container);
            graph.forEach(function (obj) { return matched.set(obj.URI, obj); });
        });
        groups.forEach(function (group) {
            var graph = [];
            (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.buildQaGraph)(group, graph, mappingUtil);
            var container = new _graph_container_group_graph_container__WEBPACK_IMPORTED_MODULE_5__.GroupGraphContainer(graph, group);
            groupContainers.push(container);
            graph.forEach(function (obj) { return matched.set(obj.URI, obj); });
        });
        var objectLeft = qaObjects.filter(function (obj) { return !matched.has(obj.URI); });
        return {
            groupGraphContainerList: groupContainers,
            instanceGraphContainerList: groupInstanceContainers,
            generalGraphObjects: new _graph_container_general_graph_container__WEBPACK_IMPORTED_MODULE_7__.GeneralGraphContainer(objectLeft),
        };
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
        var answers = this.msgRL.iterator(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER);
        var answerInstances = this.msgRL.iterator(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_ANSWER_INSTANCE);
        var answer;
        var answerInstance;
        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(function (ans) { return ans.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
            answerInstance = answerInstances.find(function (ins) { return ins.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
        }
        this.logger.info('get answerURI', answer === null || answer === void 0 ? void 0 : answer.URI);
        this.logger.info('get answerInstanceURI', answerInstance === null || answerInstance === void 0 ? void 0 : answerInstance.URI);
        return [answer, answerInstance];
    };
    GroupAPI.prototype.createGroupInstance = function (group) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createVitalObject)(this.vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP_INSTANCE);
        obj.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_HALEY_GROUP, group.URI);
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
/* harmony export */   "TYPE_FOLLOWUP_FIRM_ANSWER": () => (/* binding */ TYPE_FOLLOWUP_FIRM_ANSWER),
/* harmony export */   "TYPE_FOLLOWUP_NO_ANSWER": () => (/* binding */ TYPE_FOLLOWUP_NO_ANSWER),
/* harmony export */   "MAPPING_ANSWER_TO_ANSWER_INSTANCE": () => (/* binding */ MAPPING_ANSWER_TO_ANSWER_INSTANCE),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_TYPE),
/* harmony export */   "SHORT_NAME_HALEY_ROW_TYPE_URI": () => (/* binding */ SHORT_NAME_HALEY_ROW_TYPE_URI),
/* harmony export */   "SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER": () => (/* binding */ SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER_DATA_TYPE": () => (/* binding */ SHORT_NAME_HALEY_ANSWER_DATA_TYPE),
/* harmony export */   "SHORT_NAME_EDGE_SOURCE": () => (/* binding */ SHORT_NAME_EDGE_SOURCE),
/* harmony export */   "SHORT_NAME_EDGE_DESTINATION": () => (/* binding */ SHORT_NAME_EDGE_DESTINATION),
/* harmony export */   "SHORT_NAME_FOLLOWUP_TYPE": () => (/* binding */ SHORT_NAME_FOLLOWUP_TYPE),
/* harmony export */   "SHORT_NAME_HALEY_GROUP": () => (/* binding */ SHORT_NAME_HALEY_GROUP),
/* harmony export */   "SHORT_NAME_HALEY_ROW": () => (/* binding */ SHORT_NAME_HALEY_ROW),
/* harmony export */   "SHORT_NAME_HALEY_QUESTION": () => (/* binding */ SHORT_NAME_HALEY_QUESTION),
/* harmony export */   "SHORT_NAME_HALEY_ANSWER": () => (/* binding */ SHORT_NAME_HALEY_ANSWER),
/* harmony export */   "SHORT_NAME_HALEY_SECTION": () => (/* binding */ SHORT_NAME_HALEY_SECTION),
/* harmony export */   "SHORT_NAME_TEXT_ANSWER_VALUE": () => (/* binding */ SHORT_NAME_TEXT_ANSWER_VALUE),
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
/* harmony export */   "EDGE_ANSWER_CONSTRAINT": () => (/* binding */ EDGE_ANSWER_CONSTRAINT),
/* harmony export */   "EDGE_ANSWER_DEPENDENCY": () => (/* binding */ EDGE_ANSWER_DEPENDENCY),
/* harmony export */   "EDGE_QUESTION_DEPENDENCY": () => (/* binding */ EDGE_QUESTION_DEPENDENCY),
/* harmony export */   "EDGE_TAXONOMY": () => (/* binding */ EDGE_TAXONOMY),
/* harmony export */   "EDGE_ENHANCEMENT_RULE_DEPENDENCY": () => (/* binding */ EDGE_ENHANCEMENT_RULE_DEPENDENCY),
/* harmony export */   "EDGE_DEFAULT_ANSWER": () => (/* binding */ EDGE_DEFAULT_ANSWER),
/* harmony export */   "EDGE_VALIDATION_ANSWER_INSTANCE": () => (/* binding */ EDGE_VALIDATION_ANSWER_INSTANCE),
/* harmony export */   "EDGE_SETS": () => (/* binding */ EDGE_SETS),
/* harmony export */   "mappingTypeToDownStreamEdges": () => (/* binding */ mappingTypeToDownStreamEdges)
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
var TYPE_FOLLOWUP_FIRM_ANSWER = 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER';
var TYPE_FOLLOWUP_NO_ANSWER = 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER';
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
var SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER = 'rowInstanceCounter';
var SHORT_NAME_HALEY_ANSWER_DATA_TYPE = 'haleyAnswerDataType';
var SHORT_NAME_EDGE_SOURCE = 'edgeSource';
var SHORT_NAME_EDGE_DESTINATION = 'edgeDestination';
var SHORT_NAME_FOLLOWUP_TYPE = 'haleyAnswerFollowupType';
// GroupInstance
var SHORT_NAME_HALEY_GROUP = 'haleyGroup';
var SHORT_NAME_HALEY_ROW = 'haleyRow';
var SHORT_NAME_HALEY_QUESTION = 'haleyQuestion';
var SHORT_NAME_HALEY_ANSWER = 'haleyAnswer';
var SHORT_NAME_HALEY_SECTION = 'haleySection';
var SHORT_NAME_TEXT_ANSWER_VALUE = 'textAnswerValue';
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
var EDGE_ANSWER_CONSTRAINT = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerConstraint';
var EDGE_ANSWER_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerDependency';
var EDGE_QUESTION_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionDependency';
var EDGE_TAXONOMY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasTaxonomy';
var EDGE_ENHANCEMENT_RULE_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleDependency';
var EDGE_DEFAULT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasDefaultAnswer';
var EDGE_VALIDATION_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasValidationAnswerInstance';
var EDGE_SETS = new Set([
    EDGE_GROUP_INSTANCE,
    EDGE_SECTION,
    EDGE_ROW,
    EDGE_QUESTION,
    EDGE_ANSWER,
    EDGE_SECTION_INSTANCE,
    EDGE_ROW_INSTANCE,
    EDGE_QUESTION_INSTANCE,
    EDGE_ANSWER_INSTANCE,
    EDGE_ANSWER_OPTION,
    EDGE_ANSWER_OPTION_VALUE_DEPENDENCY,
    EDGE_ANSWER_OPTION_DEPENDENCY,
    EDGE_ANSWER_CONSTRAINT,
    EDGE_ANSWER_DEPENDENCY,
    EDGE_QUESTION_DEPENDENCY,
    EDGE_TAXONOMY,
    EDGE_ENHANCEMENT_RULE_DEPENDENCY,
    EDGE_DEFAULT_ANSWER,
    EDGE_VALIDATION_ANSWER_INSTANCE,
]);
var mappingTypeToDownStreamEdges = new Map([
    [TYPE_HALEY_GROUP, [EDGE_SECTION]],
    [TYPE_HALEY_SECTION, [EDGE_QUESTION, EDGE_ROW]],
    [TYPE_HALEY_ROW, [EDGE_QUESTION, EDGE_ROW]],
    [TYPE_HALEY_QUESTION, [EDGE_ANSWER, EDGE_QUESTION_DEPENDENCY]],
    [TYPE_HALEY_BOOLEAN_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_CHOICE_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY, EDGE_ANSWER_OPTION]],
    [TYPE_HALEY_DATE_TIME_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_FILE_UPLOAD_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_LONG_TEXT_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_MULTI_CHOICE_ANSWER, [EDGE_ANSWER_OPTION, EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_MULTI_TAXONOMY_ANSWER, [EDGE_TAXONOMY, EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_NUMBER_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_TAXONOMY_ANSWER, [EDGE_TAXONOMY, EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_TEXT_ANSWER, [EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY]],
    [TYPE_HALEY_GROUP_INSTANCE, [EDGE_SECTION_INSTANCE]],
    [TYPE_HALEY_SECTION_INSTANCE, [EDGE_QUESTION_INSTANCE, EDGE_ROW_INSTANCE]],
    [TYPE_HALEY_ROW_INSTANCE, [EDGE_QUESTION_INSTANCE, EDGE_ROW_INSTANCE]],
    [TYPE_HALEY_QUESTION_INSTANCE, [EDGE_ANSWER_INSTANCE]],
    [TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE, []],
    [TYPE_HALEY_CHOICE_ANSWER_INSTANCE, []],
    [TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE, []],
    [TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE, []],
    [TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE, []],
    [TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE, []],
    [TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE, []],
    [TYPE_HALEY_NUMBER_ANSWER_INSTANCE, []],
    [TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE, []],
    [TYPE_HALEY_TEXT_ANSWER_INSTANCE, []],
]);


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
/* harmony import */ var _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};




var SectionAPI = /** @class */ (function () {
    function SectionAPI() {
    }
    SectionAPI.createQaInstanceObjects = function (vitaljs, section, qaObjects, withRow) {
        if (withRow === void 0) { withRow = false; }
        var createdQaInstances = [];
        var sectionInstance = this.createSectionInstance(vitaljs, section);
        createdQaInstances = __spreadArray([sectionInstance], createdQaInstances);
        var edgeToQuestions = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.EDGE_QUESTION && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_SOURCE) === section.URI; });
        var edgeToQuestionURIs = edgeToQuestions.map(function (obj) { return obj.URI; });
        var questions = edgeToQuestions.map(function (edge) {
            var findQuestions = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findQuestions.length) {
                throw new Error("Could not find the question object connected to edge " + edge.URI + ", questionURI: " + edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION));
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
            var edgeToQuestionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.EDGE_QUESTION_INSTANCE, sectionInstance, questionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToQuestionInstance]), createdInstances);
        }
        if (withRow) {
            var edgeToRows = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.EDGE_ROW && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_SOURCE) === section.URI; });
            var edgeToRowURIs_1 = edgeToRows.map(function (obj) { return obj.URI; });
            var rows = edgeToRows.map(function (edge) {
                var rowURI = edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_EDGE_DESTINATION);
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
                var row = rows_1[_b];
                // if withRow then default to with RowRow.
                var _c = _row_api_index__WEBPACK_IMPORTED_MODULE_1__.RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, undefined, undefined, true), rowQaObjectsLeft = _c.qaObjectsLeft, createdInstances = _c.createdInstances, rowInstance = _c.rowInstance;
                qaObjectsLeft = rowQaObjectsLeft;
                var edgeToRowInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.EDGE_ROW_INSTANCE, sectionInstance, rowInstance);
                createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToRowInstance]), createdInstances);
            }
        }
        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            sectionInstance: sectionInstance,
        };
    };
    SectionAPI.createSectionInstance = function (vitaljs, section) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_3__.createVitalObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.TYPE_HALEY_SECTION_INSTANCE);
        obj.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_2__.SHORT_NAME_HALEY_SECTION, section.URI);
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
/* harmony import */ var _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


var QuestionAPI = /** @class */ (function () {
    function QuestionAPI() {
    }
    QuestionAPI.createQuestionInstance = function (vitaljs, question) {
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createVitalObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_QUESTION_INSTANCE);
        obj.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_QUESTION, question.URI);
        return obj;
    };
    QuestionAPI.createAnswerInstance = function (vitaljs, answer) {
        var instanceType = _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.MAPPING_ANSWER_TO_ANSWER_INSTANCE.get(answer.type);
        if (!instanceType) {
            throw new Error("No instanceType mapping for answerType: " + answer.type);
        }
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createVitalObject)(vitaljs, instanceType);
        obj.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ANSWER, answer.URI);
        obj.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_FOLLOWUP_TYPE, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_FOLLOWUP_NO_ANSWER);
        return obj;
    };
    QuestionAPI.createQaInstanceObjects = function (vitaljs, question, qaObjects) {
        var questionInstance = QuestionAPI.createQuestionInstance(vitaljs, question);
        var edgeToAnswers = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === question.URI; });
        var edgeToAnswerURIs = edgeToAnswers.map(function (obj) { return obj.URI; });
        var answerURIs = edgeToAnswers.map(function (edge) { return edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var answers = qaObjects.filter(function (obj) { return answerURIs.includes(obj.URI); });
        if (edgeToAnswers.length === 0 || answers.length === 0) {
            throw new Error("Question " + question.URI + " does not have any connected answer object. EdgeToAnswer=" + edgeToAnswers + ", answer=" + answers);
        }
        if (edgeToAnswers.length !== 1 || answers.length !== 1) {
            throw new Error("Question " + question.URI + " have multiple answers connected. EdgeToAnswer=" + edgeToAnswers + ", answer=" + answers);
        }
        var qaObjectsLeft = qaObjects.filter(function (obj) { return obj.URI !== question.URI && !edgeToAnswerURIs.includes(obj.URI) && !answerURIs.includes(obj.URI); });
        var answerInstance = QuestionAPI.createAnswerInstance(vitaljs, answers[0]);
        var edgeToAnswerInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_0__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER_INSTANCE, questionInstance, answerInstance);
        return {
            createdInstances: [questionInstance, edgeToAnswerInstance, answerInstance],
            questionInstance: questionInstance,
            qaObjectsLeft: qaObjectsLeft,
        };
    };
    QuestionAPI.getQaInstancesWithEdges = function (qaInstanceObjects, questionInstance) {
        var edgeToQuestionInstance = qaInstanceObjects.find(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION) === questionInstance.URI; });
        var edgeToAnswerInstance = qaInstanceObjects.find(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === questionInstance.URI; });
        var answerInstanceURI = edgeToAnswerInstance.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION);
        var answerInstance = qaInstanceObjects.find(function (obj) { return obj.URI === answerInstanceURI; });
        return [edgeToQuestionInstance, questionInstance, edgeToAnswerInstance, answerInstance];
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
/* harmony export */   "createEdgeObject": () => (/* binding */ createEdgeObject),
/* harmony export */   "getDestinationObjects": () => (/* binding */ getDestinationObjects),
/* harmony export */   "getSourceObject": () => (/* binding */ getSourceObject),
/* harmony export */   "isEdge": () => (/* binding */ isEdge),
/* harmony export */   "buildQaGraph": () => (/* binding */ buildQaGraph)
/* harmony export */ });
/* harmony import */ var _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * Create vital Object based on the type given
 * @param type {String} type of graphObject
 * @return a GraphObject
 */
var createVitalObject = function (vitaljs, type, properties) {
    if (properties === void 0) { properties = {}; }
    if (!type) {
        console.error("Argument type is not pass in", type);
    }
    var parts = type.split('#');
    if (parts.length != 2 || !parts[1]) {
        console.error("This function could not support this type of objects creation", type, parts);
    }
    var obj = vitaljs.graphObject({ type: type });
    obj.URI = 'http://vital.ai/haley.ai/haley-saas/' + parts[1] + '/' + new Date().getTime() + '-' + Math.round(100000000000 * Math.random());
    Object.keys(properties).forEach(function (property) {
        obj.set(property, properties[property] || null);
    });
    return obj;
};
var createEdgeObject = function (vitaljs, type, source, destination) {
    var edge = createVitalObject(vitaljs, type);
    if (source) {
        edge.set(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE, (source === null || source === void 0 ? void 0 : source.URI) || null);
    }
    if (destination) {
        edge.set(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION, (destination === null || destination === void 0 ? void 0 : destination.URI) || null);
    }
    return edge;
};
var getDestinationObjects = function (objects, edgeType, source) {
    var edges = objects.filter(function (obj) { return obj.type === edgeType && obj.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE) === source.URI; });
    var destinationURIs = edges.map(function (edge) { return edge.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION); });
    var set = new Set(destinationURIs);
    return objects.filter(function (obj) { return set.has(obj.URI); });
};
var getSourceObject = function (objects, edgeType, destination) {
    var edge = objects.find(function (obj) { return obj.type === edgeType && obj.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION) === destination.URI; });
    var sourceURI = edge.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE);
    var source = objects.find(function (obj) { return obj.URI === sourceURI; });
    if (!source) {
        throw new Error("No source object found based on the provided object " + destination.URI + " and edgeType " + edgeType);
    }
    return source;
};
var isEdge = function (vitaljs, type) {
    var rootEdge = 'http://vital.ai/ontology/vital-core#VITAL_Edge';
    if (type === rootEdge)
        return true;
    return vitaljs.isSubclassOf(type, rootEdge);
};
var buildQaGraph = function (root, graph, mappingUtil) {
    if (!root)
        return;
    graph.push(root);
    var edgeTypes = _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.mappingTypeToDownStreamEdges.get(root.type);
    if (!edgeTypes)
        return;
    edgeTypes.forEach(function (edgeType) {
        var edges = mappingUtil.getObjectsByType(edgeType).filter(function (edge) { return edge.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE) === root.URI; });
        edges.forEach(function (edge) {
            var destinationObjectURI = edge.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            if (!destinationObjectURI) {
                throw new Error("Property " + _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION + " for edge " + edge.URI + " is not set.");
            }
            var destinationObject = mappingUtil.getObjectByURI(destinationObjectURI);
            if (!destinationObject) {
                console.error("Could not find the destination object for edge " + edge.URI);
            }
            graph.push(edge);
            buildQaGraph(destinationObject, graph, mappingUtil);
        });
    });
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
/* harmony import */ var _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};




var RowAPI = /** @class */ (function () {
    function RowAPI() {
    }
    RowAPI.createRowInstance = function (vitaljs, row, rowInstanceCounter) {
        var _a;
        if (rowInstanceCounter === void 0) { rowInstanceCounter = 'AA'; }
        var obj = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createVitalObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW_INSTANCE, (_a = {}, _a[_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW] = row.URI, _a[_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER] = rowInstanceCounter, _a));
        return obj;
    };
    RowAPI.getRowByRowType = function (qaObjects, rowType) {
        var rows = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI) === rowType; });
        if (!rows.length) {
            throw new Error("No row found with rowType: " + rowType);
        }
        if (rows.length !== 1) {
            throw new Error("Multiple rows found with rowType: " + rowType + "; row uris: " + rows.map(function (obj) { return obj.URI; }));
        }
        return rows[0];
    };
    // This will only handle the row case not the row-row case. 
    // if rowInstanceCounter provided, then there should only be one rowInstance exists that meet the criteria.
    RowAPI.getRowInstanceByRowAndInstanceCounter = function (qaInstanceObjects, row, rowInstanceCounter) {
        var rowInstances = qaInstanceObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW) === row.URI && (!rowInstanceCounter || obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER) === rowInstanceCounter); });
        if (rowInstanceCounter && !rowInstances.length) {
            throw new Error("No rowInstance found to connect row " + row.URI + " with counter: " + rowInstanceCounter);
        }
        if (rowInstanceCounter && rowInstances.length !== 1) {
            throw new Error("Multiple rowInstances found to connect row " + row.URI + "; rowInstances uris: " + rowInstances.map(function (obj) { return obj.URI; }));
        }
        return rowInstances;
    };
    RowAPI.getSiblingRowInstances = function (qaInstanceObjects, row, rowInstance) {
        var upperInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getSourceObject)(qaInstanceObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, rowInstance);
        var rowInstances = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaInstanceObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, upperInstance);
        var siblings = rowInstances.filter(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW) === row.URI; });
        return siblings;
    };
    RowAPI.getInstancesUnderRowInstance = function (qaInstanceObjects, rowInstance) {
        var instances = [];
        var edgeToProvidedRowInstance = qaInstanceObjects.find(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION) === rowInstance.URI; });
        instances = [edgeToProvidedRowInstance, rowInstance];
        var questionInstances = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaInstanceObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION_INSTANCE, rowInstance);
        questionInstances.forEach(function (questionInstance) {
            var questionInstanceAndAnswerInstanceWithEdge = _question_api_index__WEBPACK_IMPORTED_MODULE_0__.QuestionAPI.getQaInstancesWithEdges(qaInstanceObjects, questionInstance);
            instances = __spreadArray(__spreadArray([], instances), questionInstanceAndAnswerInstanceWithEdge);
        });
        var rowRowInstances = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaInstanceObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, rowInstance);
        rowRowInstances.forEach(function (rowRowInstance) {
            var rowRowInstanceQaInstances = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowRowInstance);
            instances = __spreadArray(__spreadArray([], instances), rowRowInstanceQaInstances);
        });
        return instances;
    };
    RowAPI.createQaInstanceObjects = function (vitaljs, row, qaObjects, rowInstanceCounter, level, handleRowRow) {
        if (rowInstanceCounter === void 0) { rowInstanceCounter = 'AA'; }
        if (level === void 0) { level = 1; }
        if (handleRowRow === void 0) { handleRowRow = false; }
        var createdQaInstances = [];
        var rowInstance = this.createRowInstance(vitaljs, row, rowInstanceCounter);
        createdQaInstances = __spreadArray([rowInstance], createdQaInstances);
        var edgeToQuestions = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
        var edgeToQuestionURIs = edgeToQuestions.map(function (obj) { return obj.URI; });
        var questions = edgeToQuestions.map(function (edge) {
            var findQuestions = qaObjects.filter(function (obj) { return obj.URI === edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
            if (!findQuestions.length) {
                throw new Error("Could not find the question object connected to edge " + edge.URI + ", questionURI: " + edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION));
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
            var edgeToQuestionInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION_INSTANCE, rowInstance, questionInstance);
            createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToQuestionInstance]), createdInstances);
        }
        if (handleRowRow && level <= RowAPI.maxLevel) {
            var edgeToRows = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
            var edgeToRowURIs_1 = edgeToRows.map(function (obj) { return obj.URI; });
            var rows = edgeToRows.map(function (edge) {
                var rowURI = edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION);
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
                var _c = RowAPI.createQaInstanceObjects(vitaljs, row_1, qaObjectsLeft, undefined, level + 1), rowQaObjectsLeft = _c.qaObjectsLeft, createdInstances = _c.createdInstances, secondLevelRowInstance = _c.rowInstance;
                qaObjectsLeft = rowQaObjectsLeft;
                var edgeToRowInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, rowInstance, secondLevelRowInstance);
                createdQaInstances = __spreadArray(__spreadArray(__spreadArray([], createdQaInstances), [edgeToRowInstance]), createdInstances);
            }
        }
        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            rowInstance: rowInstance,
        };
    };
    RowAPI.createQaRowInstanceObjectsWithUpperEdge = function (vitaljs, row, qaObjects, qaInstanceObjects, rowInstanceCounter, providedUpperInstance, providedLevel, option) {
        if (rowInstanceCounter === void 0) { rowInstanceCounter = 'AA'; }
        if (option === void 0) { option = {}; }
        var upperInstance;
        var level;
        if (!providedUpperInstance) {
            var edgeToProvideRow_1 = qaObjects.find(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION) === row.URI; });
            if (!edgeToProvideRow_1) {
                throw new Error('Could not find any edges that pointed to the provided row');
            }
            var rowOrSection_1 = qaObjects.find(function (obj) { return obj.URI === edgeToProvideRow_1.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE); });
            if (!rowOrSection_1) {
                throw new Error("Could not find the upper object that pointed to the provided row. upper object URI: " + edgeToProvideRow_1.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE));
            }
            var shortNameToMatchUpperObject_1 = rowOrSection_1.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW ? _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW : _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_SECTION;
            var upperInstanceType_1 = rowOrSection_1.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW ? _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW_INSTANCE : _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_SECTION_INSTANCE;
            upperInstance = qaInstanceObjects.find(function (obj) { return obj.type === upperInstanceType_1 && obj.get(shortNameToMatchUpperObject_1) === rowOrSection_1.URI; });
            level = rowOrSection_1.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW ? 2 : 1;
        }
        else {
            upperInstance = providedUpperInstance;
            level = providedLevel;
        }
        if (!upperInstance) {
            throw new Error("Could not find the upper instance object.");
        }
        var _a = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjects, rowInstanceCounter, level, option.handleRowRow), createdInstances = _a.createdInstances, createdRowInstance = _a.rowInstance;
        var edgeToRowInstance = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.createEdgeObject)(vitaljs, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, upperInstance, createdRowInstance);
        return __spreadArray([edgeToRowInstance], createdInstances);
    };
    RowAPI.getRowAndRowInstancePair = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType) {
        var row = RowAPI.getRowByRowType(qaObjects, rowType);
        var rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];
        return [row, rowInstance];
    };
    RowAPI.getRowRowPairUnderRowPair = function (qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType) {
        var edgeToRows = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
        var rowRowURIs = edgeToRows.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        // 1 get row based on rowRowType
        var rowRows = qaObjects.filter(function (obj) {
            return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW && rowRowURIs.includes(obj.URI) && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI) === rowRowType;
        });
        if (!rowRows.length) {
            throw new Error("No row found with rowRowType: " + rowRowType + " under row (" + row.URI + ")");
        }
        if (rowRows.length !== 1) {
            throw new Error("Multiple rowRows found with rowRowType: " + rowRowType + "; row uris: " + rowRows.map(function (obj) { return obj.URI; }));
        }
        var rowRow = rowRows[0];
        // 3 get rowInstance based on rowInstanceCounter
        var edgeFromRowInstanceToRowRowInstances = qaInstanceObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === rowInstance.URI; });
        var rowRowInstanceUnderProvidedRowInstanceURIs = edgeFromRowInstanceToRowRowInstances.map(function (edge) { return edge.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var rowRowInstancesUnderProvidedRowInstance = qaInstanceObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_ROW_INSTANCE && rowRowInstanceUnderProvidedRowInstanceURIs.includes(obj.URI); });
        var rowRowInstances = rowRowInstancesUnderProvidedRowInstance.filter(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW) === rowRow.URI && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER) === rowRowInstanceCounter; });
        if (!rowRowInstances.length) {
            throw new Error("No rowInstance found to connect row " + rowRow.URI + " with counter: " + rowRowInstanceCounter);
        }
        if (rowRowInstances.length !== 1) {
            throw new Error("Multiple rowInstances found to connect row " + rowRow.URI + "; rowInstances uris: " + rowRowInstances.map(function (obj) { return obj.URI; }));
        }
        var rowRowInstance = rowRowInstances[0];
        // const rowRowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaObjects, qaInstanceObjects, rowRow, rowRowInstanceCounter);
        return [rowRow, rowRowInstance];
    };
    RowAPI.getAnswerPairByAnswerTypeUnderRowPair = function (qaObjects, qaInstanceObjects, row, rowInstance, answerType) {
        // 2 get answerObject based on answerType and row;
        var edgeFromRowToQuestions = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === row.URI; });
        var questionURIs = edgeFromRowToQuestions.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var edgeFromRowToAnswers = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER && questionURIs.includes(obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE)); });
        var answerURIs = edgeFromRowToAnswers.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var answers = qaObjects.filter(function (obj) { return answerURIs.includes(obj.URI) && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ANSWER_TYPE) === answerType; });
        var rowType = row.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI);
        if (!answers.length) {
            throw new Error("No answer object found with answerType: " + rowType + " under rowType: " + rowType + ". Any of the following could be missing: edgeFromRowToQuestionObject, EdgeFromQuestionToAnswer, AnswerObject.");
        }
        if (answers.length !== 1) {
            throw new Error("Multiple answers found with answerType: " + rowType + "; answer uris: " + answers.map(function (obj) { return obj.URI; }));
        }
        var answer = answers[0];
        // 4 get answerInstance based on answerObject and rowInstance
        var edgeFromRowToQuestionInstances = qaInstanceObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_QUESTION_INSTANCE && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE) === rowInstance.URI; });
        var questionInstanceURIs = edgeFromRowToQuestionInstances.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var edgeToAnswerInstances = qaInstanceObjects.filter(function (obj) { var _a; return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ANSWER_INSTANCE && questionInstanceURIs.includes((_a = obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_SOURCE)) !== null && _a !== void 0 ? _a : ''); });
        var answerInstanceURIs = edgeToAnswerInstances.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_EDGE_DESTINATION); });
        var answerInstances = qaInstanceObjects.filter(function (obj) { return answerInstanceURIs.includes(obj.URI) && obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ANSWER) === answer.URI; });
        if (!answerInstances.length) {
            throw new Error("No matched answerInstance object found.");
        }
        if (answerInstances.length !== 1) {
            throw new Error("Multiple matched answerInstances found. answerInstance uris: " + answerInstances.map(function (obj) { return obj.URI; }));
        }
        var answerInstance = answerInstances[0];
        return [answer, answerInstance];
    };
    RowAPI.getAnswerPairByAnswerTypeInsideRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType) {
        // 1 get row and rowInstance
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        var _b = RowAPI.getAnswerPairByAnswerTypeUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, answerType), answer = _b[0], answerInstance = _b[1];
        return [answer, answerInstance];
    };
    // given row counter, row type, row-row counter, row-row-type, and answer type, get value, if any.
    RowAPI.getAnswerPairByAnswerTypeInsideRowRow = function (qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType) {
        // 1 get row and rowInstance
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        var _b = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType), rowRow = _b[0], rowRowInstance = _b[1];
        var _c = RowAPI.getAnswerPairByAnswerTypeUnderRowPair(qaObjects, qaInstanceObjects, rowRow, rowRowInstance, answerType), answer = _c[0], answerInstance = _c[1];
        return [answer, answerInstance];
    };
    RowAPI.getRowInstanceCountersByRowType = function (qaObjects, qaInstanceObjects, rowType) {
        var row = RowAPI.getRowByRowType(qaObjects, rowType);
        var rowInstances = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row);
        return rowInstances.map(function (ins) { return ins.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER); });
    };
    RowAPI.updateRowInstanceCounterByRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, counter) {
        var counters = RowAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowType);
        if (counters.includes(counter)) {
            throw new Error("The rowInstance with counter as " + counter + " is already exists");
        }
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        rowInstance.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, counter);
        return rowInstance;
    };
    RowAPI.getRowRowInstanceCountersByRowRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType) {
        var row = RowAPI.getRowByRowType(qaObjects, rowType);
        var rowRow = RowAPI.getRowByRowType(qaObjects, rowRowType);
        var rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];
        var rowRowInstances = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaInstanceObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW_INSTANCE, rowInstance);
        var rowInstancesConnectedToRowRow = RowAPI.getRowInstanceByRowAndInstanceCounter(rowRowInstances, rowRow);
        return rowInstancesConnectedToRowRow.map(function (ins) { return ins.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER); });
    };
    RowAPI.updateRowRowInstanceCountersByRowRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter, counter) {
        var rowRowInstanceCounters = RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
        if (rowRowInstanceCounters.includes(counter)) {
            throw new Error("The rowInstance with counter as " + counter + " is already exists");
        }
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        var _b = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType), rowRow = _b[0], rowRowInstance = _b[1];
        rowRowInstance.set(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, counter);
        return rowRowInstance;
    };
    // handleRowRow set to true will create rowRowInstance within the result.
    RowAPI.createRowQaInstancesByRowType = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, handleRowRow) {
        if (handleRowRow === void 0) { handleRowRow = false; }
        var row = RowAPI.getRowByRowType(qaObjects, rowType);
        var rowInstances = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row);
        var rowInstanceCounters = rowInstances.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER); });
        if (rowInstanceCounter) {
            if (rowInstanceCounters.includes(rowInstanceCounter)) {
                throw new Error("The generated rowInstanceCounters has already existed, existing rowInstanceCounters: " + rowInstanceCounters + ". The rowInstanceCounter provided: " + rowInstanceCounter);
            }
            return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, row, qaObjects, qaInstanceObjects, rowInstanceCounter, undefined, undefined, { handleRowRow: handleRowRow });
        }
        var generatedRowInstanceCounter = RowAPI.generateRowInstanceCounter(rowInstances.length);
        if (rowInstanceCounters.includes(generatedRowInstanceCounter)) {
            throw new Error("The generated rowInstanceCounters has already existed, existing rowInstanceCounters: " + rowInstanceCounters + ". The generated rowInstanceCounter: " + generatedRowInstanceCounter);
        }
        return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, row, qaObjects, qaInstanceObjects, generatedRowInstanceCounter, undefined, undefined, { handleRowRow: handleRowRow });
    };
    RowAPI.removeRowQaInstancesByRowType = function (qaObjects, qaInstanceObjects, rowType, rowInstanceCounter) {
        var row = RowAPI.getRowByRowType(qaObjects, rowType);
        var rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];
        // const siblingRowInstances = RowAPI.getSiblingRowInstances(qaInstanceObjects, row, rowInstance).filter(instance => instance.URI !== rowInstance.URI);
        var instancesUnderRowInstanceWithUpperEdge = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowInstance);
        var objToBeRemoveURIs = new Set(instancesUnderRowInstanceWithUpperEdge.map(function (obj) { return obj.URI; }));
        var instancesLeft = qaInstanceObjects.filter(function (obj) { return !objToBeRemoveURIs.has(obj.URI); });
        // siblingRowInstances.forEach((ins, index) => {
        //     ins.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, RowAPI.generateRowInstanceCounter(index));
        // });
        return instancesLeft;
    };
    RowAPI.createRowRowQaInstancesByRowType = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter) {
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        var rowRow = RowAPI.getRowByRowType(qaObjects, rowRowType);
        var rowRowInstanceCounters = RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
        if (rowRowInstanceCounter && rowRowInstanceCounters.includes(rowRowInstanceCounter)) {
            throw new Error("RowInstance with counter " + rowRowInstanceCounter + " already exist");
        }
        if (rowRowInstanceCounter) {
            return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, rowRow, qaObjects, qaInstanceObjects, rowRowInstanceCounter, rowInstance, 2);
        }
        var generatedCounter;
        var index = rowRowInstanceCounters.length;
        while (!generatedCounter) {
            var counter = this.generateRowInstanceCounter(index);
            if (rowRowInstanceCounters.includes(counter)) {
                index += 1;
            }
            else {
                generatedCounter = counter;
            }
        }
        return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, rowRow, qaObjects, qaInstanceObjects, generatedCounter, rowInstance, 2);
    };
    RowAPI.removeRowRowQaInstancesByRowType = function (vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter) {
        var _a = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType), row = _a[0], rowInstance = _a[1];
        var _b = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType), rowRow = _b[0], rowRowInstance = _b[1];
        var instancesUnderRowInstanceWithUpperEdge = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowRowInstance);
        var objToBeRemoveURIs = new Set(instancesUnderRowInstanceWithUpperEdge.map(function (obj) { return obj.URI; }));
        var instancesLeft = qaInstanceObjects.filter(function (obj) { return !objToBeRemoveURIs.has(obj.URI); });
        return instancesLeft;
    };
    RowAPI.getFirstLevelRows = function (qaObjects) {
        var sections = qaObjects.filter(function (obj) { return obj.type === _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.TYPE_HALEY_SECTION; });
        var rows = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.flatten)(sections.map(function (section) { return (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW, section); }));
        return rows;
    };
    RowAPI.getRowTypes = function (qaObjects) {
        var rows = RowAPI.getFirstLevelRows(qaObjects);
        return rows.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI); });
    };
    RowAPI.getRowTypesInRow = function (qaObjects, rowType) {
        var rows = RowAPI.getFirstLevelRows(qaObjects);
        var row = rows.find(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI) === rowType; });
        if (!row) {
            throw new Error("Couldn't find any row with rowType: " + rowType);
        }
        var rowRows = (0,_util_util__WEBPACK_IMPORTED_MODULE_2__.getDestinationObjects)(qaObjects, _util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.EDGE_ROW, row);
        return rowRows.map(function (obj) { return obj.get(_util_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_1__.SHORT_NAME_HALEY_ROW_TYPE_URI); });
    };
    RowAPI.generateRowInstanceCounter = function (index) {
        if (index > 26 * 26) {
            throw new Error("The max rowInstance for a row is " + 26 * 26 + ". The request number is " + index);
        }
        var indexToCapitalCharacter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var div = Math.floor(index / 26);
        var mod = index % 26;
        return indexToCapitalCharacter[div] + indexToCapitalCharacter[mod];
    };
    RowAPI.counterToNumber = function (counter) {
        var character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var max = RowAPI.maximumSiblingRowInstances + 2;
        if (!counter)
            return max;
        if (counter.length === 1) {
            if (!character.includes(counter))
                return max;
            return character.indexOf(counter);
        }
        if (counter.length === 2) {
            if (!character.includes(counter[0]) || !character.includes(counter[1]))
                return max;
            return character.indexOf(counter[0]) * 26 + character.indexOf(counter[1]);
        }
        return max;
    };
    RowAPI.compareRowInstanceCounter = function (counter1, counter2) {
        return RowAPI.counterToNumber(counter1) - RowAPI.counterToNumber(counter2);
    };
    // 1 means row will not have another connected to it, 2 means it will handle row->row case, 3 means row->row->row case.
    RowAPI.maxLevel = 2;
    RowAPI.maximumSiblingRowInstances = 26 * 26;
    return RowAPI;
}());



/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash");;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MappingUtil": () => (/* binding */ MappingUtil)
/* harmony export */ });
/* harmony import */ var _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


var MappingUtil = /** @class */ (function () {
    function MappingUtil(qaObjects) {
        var _this = this;
        this._mapUriToObject = new Map();
        this._mapTypeToObjects = new Map();
        this._isComplete = true;
        this._incompleteMessages = [];
        this._mappingSourceUriToEdges = new Map();
        this._mappingDestinationUriToEdges = new Map();
        this._mappingQuestionUriToQuestionTree = new Map();
        this._mappingQuestionInstanceUriToQuestionInstanceTree = new Map();
        this._qaObjects = qaObjects;
        qaObjects.forEach(function (obj) {
            if (!obj.type || !obj.URI) {
                throw new Error("Graph object should have properties of URI and type. This object in the list has the following value URI=" + obj.URI + ", type=" + obj.type);
            }
            _this._mapUriToObject.set(obj.URI, obj);
            var objectsOfType = _this._mapTypeToObjects.get(obj.type) || [];
            _this._mapTypeToObjects.set(obj.type, __spreadArray(__spreadArray([], objectsOfType), [obj]));
            if (_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_SETS.has(obj.type)) {
                var sourceURI = obj.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_SOURCE);
                var destinationURI = obj.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                var sourceEdges = _this._mappingSourceUriToEdges.get(sourceURI) || [];
                _this._mappingSourceUriToEdges.set(sourceURI, __spreadArray(__spreadArray([], sourceEdges), [obj]));
                _this._mappingDestinationUriToEdges.set(destinationURI, obj);
            }
        });
        this.mapGroupGraph();
        this.mapGroupInstanceGraph();
    }
    ;
    MappingUtil.prototype.mapGroupGraph = function () {
        var _a, _b;
        var group = (_a = this.getObjectsByType(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.TYPE_HALEY_GROUP)) === null || _a === void 0 ? void 0 : _a[0];
        if (!group)
            return;
        var toQuestionEdges = this.getObjectsByType(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION) || [];
        for (var i = 0; i < toQuestionEdges.length; i++) {
            var edgeToQuestion = toQuestionEdges[i];
            var questionURI = edgeToQuestion.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var question = void 0;
            question = this._mapUriToObject.get(questionURI);
            if (!question) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find the question object URI=" + questionURI + ", which is the destination of edge " + edgeToQuestion.URI);
                continue;
            }
            var edgeToAnswer = (_b = this._mappingSourceUriToEdges.get(questionURI)) === null || _b === void 0 ? void 0 : _b[0];
            if (!edgeToAnswer) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find any edge from question " + questionURI + " to answer.");
                continue;
            }
            var answerURI = edgeToAnswer.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var answer = this._mapUriToObject.get(answerURI);
            if (!answer) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find the answer object " + answerURI + ", which is the destination of edge " + edgeToAnswer.URI);
                continue;
            }
            var fromAnswerEdges = this._mappingSourceUriToEdges.get(answerURI) || [];
            var answerTree = [];
            for (var i_1 = 0; i_1 < fromAnswerEdges.length; i_1++) {
                var edge = fromAnswerEdges[i_1];
                var destinationURI = edge.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                var destination = this._mapUriToObject.get(destinationURI);
                if (!destination) {
                    this._isComplete = false;
                    this._incompleteMessages.push("Could not find the object URI " + destinationURI + ", which is the destination object of edge " + edge.URI);
                    continue;
                }
                answerTree.push(edge);
                answerTree.push(destination);
            }
            ;
            this._mappingQuestionUriToQuestionTree.set(questionURI, {
                edgeToQuestion: edgeToQuestion,
                question: question,
                edgeToAnswer: edgeToAnswer,
                answer: answer,
                answerTree: answerTree,
            });
        }
        ;
        var edgeToSections = this.getObjectsByType(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION);
        for (var i = 0; i < edgeToSections.length; i++) {
            var edgeToSection = edgeToSections[i];
            var sectionURI = edgeToSection.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var section = this.getObjectByURI(sectionURI);
            if (!section) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find section object " + sectionURI + ", which is the destination object of Edge " + edgeToSection.URI);
                continue;
            }
            var edgesFromSection = this._mappingSourceUriToEdges.get(sectionURI) || [];
            for (var j = 0; j < edgesFromSection.length; j++) {
                var edgeFromSection = edgesFromSection[j];
                var objectURI = edgeFromSection.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                var obj = this.getObjectByURI(objectURI);
                // question object will be detect by the code above this for loop
                if ((edgeFromSection === null || edgeFromSection === void 0 ? void 0 : edgeFromSection.type) === _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION)
                    continue;
                if (!obj) {
                    this._isComplete = false;
                    this._incompleteMessages.push("Could not find object " + objectURI + ", which is the destination object of Edge " + edgeFromSection.URI);
                    continue;
                }
                var rowURI = objectURI;
                var edgesFromRow = this._mappingSourceUriToEdges.get(rowURI) || [];
                for (var k = 0; k < edgesFromRow.length; k++) {
                    var edgeFromRow = edgesFromRow[k];
                    var objectURI_1 = edgeFromRow.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                    var obj_1 = this.getObjectByURI(objectURI_1);
                    if ((edgeFromRow === null || edgeFromRow === void 0 ? void 0 : edgeFromRow.type) === _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION)
                        continue;
                    if (!obj_1) {
                        this._isComplete = false;
                        this._incompleteMessages.push("Could not find object " + objectURI_1 + ", which is the destination object of Edge " + edgeFromRow.URI);
                        continue;
                    }
                }
            }
        }
    };
    MappingUtil.prototype.mapGroupInstanceGraph = function () {
        var _a;
        var toQuestionInstanceEdges = this.mapTypeToObjects.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION_INSTANCE) || [];
        for (var i = 0; i < toQuestionInstanceEdges.length; i++) {
            var edgeToQuestionInstance = toQuestionInstanceEdges[i];
            var questionInstanceURI = edgeToQuestionInstance.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var questionInstance = this._mapUriToObject.get(questionInstanceURI);
            if (!questionInstance) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find the questionInstance object URI=" + questionInstanceURI + ", which is the destination of edge " + edgeToQuestionInstance.URI);
                continue;
            }
            var edgeToAnswerInstance = (_a = this._mappingSourceUriToEdges.get(questionInstanceURI)) === null || _a === void 0 ? void 0 : _a[0];
            if (!edgeToAnswerInstance) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find any edge from questionInstance " + questionInstanceURI + " to answer.");
                continue;
            }
            var answerInstanceURI = edgeToAnswerInstance.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var answerInstance = this._mapUriToObject.get(answerInstanceURI);
            if (!answerInstance) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find the answerInstance object " + answerInstanceURI + ", which is the destination of edge " + edgeToAnswerInstance.URI);
                continue;
            }
            this._mappingQuestionInstanceUriToQuestionInstanceTree.set(questionInstanceURI, {
                edgeToQuestionInstance: edgeToQuestionInstance,
                questionInstance: questionInstance,
                edgeToAnswerInstance: edgeToAnswerInstance,
                answerInstance: answerInstance
            });
        }
        ;
        var edgeToSectionInstances = this.getObjectsByType(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_SECTION_INSTANCE);
        for (var i = 0; i < edgeToSectionInstances.length; i++) {
            var edgeToSectionInstance = edgeToSectionInstances[i];
            var sectionInstanceURI = edgeToSectionInstance.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
            var sectionInstance = this.getObjectByURI(sectionInstanceURI);
            if (!sectionInstance) {
                this._isComplete = false;
                this._incompleteMessages.push("Could not find sectionInstance object " + sectionInstanceURI + ", which is the destination object of Edge " + edgeToSectionInstance.URI);
                continue;
            }
            var edgesFromSectionInstance = this._mappingSourceUriToEdges.get(sectionInstanceURI) || [];
            for (var j = 0; j < edgesFromSectionInstance.length; j++) {
                var edgeFromSectionInstance = edgesFromSectionInstance[j];
                var objectURI = edgeFromSectionInstance.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                var obj = this.getObjectByURI(objectURI);
                // question object will be detect by the code above this for loop
                if ((edgeFromSectionInstance === null || edgeFromSectionInstance === void 0 ? void 0 : edgeFromSectionInstance.type) === _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION_INSTANCE)
                    continue;
                if (!obj) {
                    this._isComplete = false;
                    this._incompleteMessages.push("Could not find object " + objectURI + ", which is the destination object of Edge " + edgeFromSectionInstance.URI);
                    continue;
                }
                var rowInstanceURI = objectURI;
                var edgesFromRowInstance = this._mappingSourceUriToEdges.get(rowInstanceURI) || [];
                for (var k = 0; k < edgesFromRowInstance.length; k++) {
                    var edgeFromRowInstance = edgesFromRowInstance[k];
                    var objectURI_2 = edgeFromRowInstance.get(_type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.SHORT_NAME_EDGE_DESTINATION);
                    var obj_2 = this.getObjectByURI(objectURI_2);
                    if ((edgeFromRowInstance === null || edgeFromRowInstance === void 0 ? void 0 : edgeFromRowInstance.type) === _type_haley_ai_question__WEBPACK_IMPORTED_MODULE_0__.EDGE_QUESTION_INSTANCE)
                        continue;
                    if (!obj_2) {
                        this._isComplete = false;
                        this._incompleteMessages.push("Could not find object " + objectURI_2 + ", which is the destination object of Edge " + edgeFromRowInstance.URI);
                        continue;
                    }
                }
            }
        }
    };
    Object.defineProperty(MappingUtil.prototype, "mapUriToObject", {
        get: function () {
            return this._mapUriToObject;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MappingUtil.prototype, "mapTypeToObjects", {
        get: function () {
            return this._mapTypeToObjects;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MappingUtil.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MappingUtil.prototype, "incompleteMessages", {
        get: function () {
            return this._incompleteMessages;
        },
        enumerable: false,
        configurable: true
    });
    MappingUtil.prototype.getObjectByURI = function (uri) {
        return this._mapUriToObject.get(uri) || null;
    };
    MappingUtil.prototype.getObjectsByType = function (type) {
        return this._mapTypeToObjects.get(type) || [];
    };
    MappingUtil.prototype.has = function (uri) {
        return !!this.getObjectByURI(uri);
    };
    return MappingUtil;
}());



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupGraphContainer": () => (/* binding */ GroupGraphContainer)
/* harmony export */ });
/* harmony import */ var _graph_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GroupGraphContainer = /** @class */ (function (_super) {
    __extends(GroupGraphContainer, _super);
    function GroupGraphContainer(qaObjects, group) {
        var _this = _super.call(this, qaObjects) || this;
        _this._group = group;
        return _this;
    }
    Object.defineProperty(GroupGraphContainer.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupGraphContainer.prototype, "groupURI", {
        get: function () {
            return this._group.URI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupGraphContainer.prototype, "type", {
        get: function () {
            return 'GroupGraph';
        },
        enumerable: false,
        configurable: true
    });
    return GroupGraphContainer;
}(_graph_container__WEBPACK_IMPORTED_MODULE_0__.GraphContainer));



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphContainer": () => (/* binding */ GraphContainer)
/* harmony export */ });
/* harmony import */ var _util_mapping_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

var GraphContainer = /** @class */ (function () {
    function GraphContainer(qaObjects) {
        this._qaObjects = qaObjects;
        this.mappingUtil = new _util_mapping_util__WEBPACK_IMPORTED_MODULE_0__.MappingUtil(qaObjects);
    }
    GraphContainer.prototype.has = function (uri) {
        return this.mappingUtil.has(uri);
    };
    Object.defineProperty(GraphContainer.prototype, "isComplete", {
        get: function () {
            return this.mappingUtil.isComplete;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphContainer.prototype, "incompleteMessages", {
        get: function () {
            return this.mappingUtil.incompleteMessages;
        },
        enumerable: false,
        configurable: true
    });
    GraphContainer.prototype.getObjectByURI = function (uri) {
        return this.mappingUtil.getObjectByURI(uri);
    };
    GraphContainer.prototype.getObjectsByType = function (type) {
        return this.mappingUtil.getObjectsByType(type);
    };
    Object.defineProperty(GraphContainer.prototype, "all", {
        get: function () {
            return this._qaObjects;
        },
        enumerable: false,
        configurable: true
    });
    return GraphContainer;
}());



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupInstanceGraphContainer": () => (/* binding */ GroupInstanceGraphContainer)
/* harmony export */ });
/* harmony import */ var _graph_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GroupInstanceGraphContainer = /** @class */ (function (_super) {
    __extends(GroupInstanceGraphContainer, _super);
    function GroupInstanceGraphContainer(qaInstanceObjects, groupInstance) {
        var _this = _super.call(this, qaInstanceObjects) || this;
        _this._groupInstance = groupInstance;
        return _this;
    }
    Object.defineProperty(GroupInstanceGraphContainer.prototype, "groupInstance", {
        get: function () {
            return this._groupInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupInstanceGraphContainer.prototype, "groupInstanceURI", {
        get: function () {
            return this._groupInstance.URI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupInstanceGraphContainer.prototype, "type", {
        get: function () {
            return 'GroupInstanceGraph';
        },
        enumerable: false,
        configurable: true
    });
    return GroupInstanceGraphContainer;
}(_graph_container__WEBPACK_IMPORTED_MODULE_0__.GraphContainer));



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralGraphContainer": () => (/* binding */ GeneralGraphContainer)
/* harmony export */ });
/* harmony import */ var _graph_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GeneralGraphContainer = /** @class */ (function (_super) {
    __extends(GeneralGraphContainer, _super);
    function GeneralGraphContainer(qaObjects) {
        return _super.call(this, qaObjects) || this;
    }
    Object.defineProperty(GeneralGraphContainer.prototype, "type", {
        get: function () {
            return 'GeneralGraph';
        },
        enumerable: false,
        configurable: true
    });
    return GeneralGraphContainer;
}(_graph_container__WEBPACK_IMPORTED_MODULE_0__.GraphContainer));



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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