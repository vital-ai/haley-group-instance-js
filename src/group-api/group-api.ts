import {
    VitalJs,
    MsgRL,
    SetValueProp,
    GetValueProp,
    Logger,
    CreateSectionInstancesResult,
    GraphObject
} from '../util/type';
import {
    TYPE_HALEY_GROUP,
    SHORT_NAME_EDGE_SOURCE,
    EDGE_SECTION,
    TYPE_HALEY_SECTION,
    SHORT_NAME_EDGE_DESTINATION,
    TYPE_HALEY_GROUP_INSTANCE,
    SHORT_NAME_HALEY_GROUP,
    EDGE_SECTION_INSTANCE,
    TYPE_HALEY_ANSWER,
    TYPE_HALEY_ANSWER_INSTANCE,
    SHORT_NAME_HALEY_ANSWER,
    SHORT_NAME_HALEY_ANSWER_TYPE,
    TYPE_HALEY_TEXT_ANSWER_INSTANCE,
    TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE,
    TYPE_HALEY_CHOICE_ANSWER_INSTANCE,
    TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE,
    TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE,
    TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE,
    TYPE_HALEY_NUMBER_ANSWER_INSTANCE,
    TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE,
    TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE,
    TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE,
    TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE,
    TYPE_FOLLOWUP_NO_ANSWER,
    TYPE_FOLLOWUP_FIRM_ANSWER,
    SHORT_NAME_FOLLOWUP_TYPE,
} from '../util/type-haley-ai-question';
import { SectionAPI } from '../section-api/section-api';
import { RowAPI } from '../row-api/index';
import {
    createVitalObject,
    createEdgeObject,
    buildQaGraph
} from '../util/util';
import { CreateQaInstancesOption, SetAnswerResponseType, SetAnswerValueOptions, SplitGraph } from './type';
import { MappingUtil } from '../util/mapping-util';
import { GroupGraphContainer } from '../graph-container/group-graph-container';
import { GroupInstanceGraphContainer } from '../graph-container/group-instance-graph-container';
import { GeneralGraphContainer } from '../graph-container/general-graph-container';
import { QuestionAPI } from '../question-api/index';
import { isNumber } from 'lodash';
const moment = require('moment');
var isUri = require('isuri');
export class GroupAPI {

    static logger: Logger;
    static vitaljs: VitalJs;
    logger: Logger;
    vitaljs: VitalJs;
    objList: GraphObject[];
    instanceList: GraphObject[];
    msgRL: MsgRL;
    
    constructor(vitaljs: VitalJs, logger?: Logger, ) {
        this.logger = logger;
        this.vitaljs = vitaljs || GroupAPI.vitaljs;
        this.msgRL = vitaljs.resultList();
    }

    static getValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string, vitaljs?: VitalJs) {
        if (!vitaljs && !GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        const msgRL = (vitaljs || GroupAPI.vitaljs).resultList();
        (qaObjects || []).forEach(obj => msgRL.addResult(obj));
        (qaInstanceObjects || []).forEach(obj => msgRL.addResult(obj));

        const [answer, answerInstance] = GroupAPI.getAnswerAndAnswerInstance({ answerType }, msgRL);

        if (GroupAPI.logger) GroupAPI.logger.info('getting value from answerInstance: ', answerInstance?.URI);

        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    static setValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string, value: any, vitaljs?: VitalJs): SetAnswerResponseType {
        if (!vitaljs && !GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        const msgRL = (vitaljs || GroupAPI.vitaljs).resultList();
        (qaObjects || []).forEach(obj => msgRL.addResult(obj));
        (qaInstanceObjects || []).forEach(obj => msgRL.addResult(obj));

        const [answer, answerInstance] =  GroupAPI.getAnswerAndAnswerInstance({ answerType }, msgRL);
        const answerOptions = QuestionAPI.getAnswerOptions(qaObjects, answer);

        if (GroupAPI.logger) GroupAPI.logger.info(`setting value ${value} for instance: `, answerInstance?.URI)

        return GroupAPI.setAnswerValue(answerInstance, answer, value, { answerOptions });
    }

    private static getAnswerAndAnswerInstance(getValueProp: GetValueProp, msgRL: MsgRL) {
        const { rowType, rowCounter, answerType } = getValueProp;
        const answers: GraphObject[] = msgRL.iterator(TYPE_HALEY_ANSWER);
        const answerInstances: GraphObject[] = msgRL.iterator(TYPE_HALEY_ANSWER_INSTANCE);

        let answer: GraphObject;
        let answerInstance: GraphObject;

        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(ans => ans.get(SHORT_NAME_HALEY_ANSWER_TYPE) === answerType);
            answerInstance = answerInstances.find(ins => ins.get(SHORT_NAME_HALEY_ANSWER) === answer.URI);
        }

        if (GroupAPI.logger) GroupAPI.logger.info('get answerURI', answer?.URI);
        if (GroupAPI.logger) GroupAPI.logger.info('get answerInstanceURI', answerInstance?.URI);

        return [answer, answerInstance];
    }

    private static getAnswerValue(answerInstance: GraphObject, answerObj: GraphObject) {
        // console.log('_getAnswerValue');
        if (answerInstance) {
            switch (answerInstance.type) {
                case TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("textAnswerValue");
    
                case TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.get("booleanAnswerValue");
    
                case TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("choiceAnswerValue");
    
                case TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return answerInstance.get("dateTimeAnswerValue");
    
                case TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.get("longTextAnswerValue");
    
                case TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.get("fileAnswerValueURI");
    
                case TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.get("integerAnswerValue");
                    } else {
                        return answerInstance.get("doubleAnswerValue");
                    }
    
                case TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.get("multiChoiceAnswerValue");
    
                case TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.get("signatureAnswerValue");
    
                case TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.get("taxonomyAnswerValue");
                    return taxonomy || "";
    
                case TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomies = answerInstance.get("multiTaxonomyAnswerValue");
                    taxonomies = taxonomies ? taxonomies : [];
    
                    return taxonomies.toString();
    
                default:
                    console.error("No such questionType exists", answerInstance);
            }
        }
        return null;
    };

    private static setAnswerValue(answerInstance: GraphObject, answerObj: GraphObject, value: any, options: SetAnswerValueOptions = {}) {
        const { answerOptions } = options;
        let dataValidationResult = SetAnswerResponseType.OK;
        let dataValidationMessage = '';

        const followupType = value === null ? TYPE_FOLLOWUP_NO_ANSWER : TYPE_FOLLOWUP_FIRM_ANSWER;
        if (answerInstance) {
            answerInstance.set(SHORT_NAME_FOLLOWUP_TYPE, followupType);
            switch (answerInstance.type) {
                case TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    let v = value;
                    if (value !== null && value !== undefined && typeof value !== 'string') {
                        dataValidationResult = SetAnswerResponseType.WARNING;
                        dataValidationMessage = `${value} is not a string`;
                        v = `${value}`;
                    }
                    answerInstance.set("textAnswerValue", value);
                    break;
                case TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    if (value !== null && value !== undefined && value !== true && value !== false) {
                        dataValidationResult = SetAnswerResponseType.ERROR;
                        dataValidationMessage = `${value} is not a valid boolean value for booleanAnswerValue`;
                    } else {
                        answerInstance.set("booleanAnswerValue", value);
                    }
                    break;
                case TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    if (answerOptions && answerOptions.length && value) {
                        if (!answerOptions.map(option => option.URI).includes(value)) {
                            dataValidationResult = SetAnswerResponseType.ERROR;
                            dataValidationMessage = `${value} is not a valid choice value for choiceAnswerValue. It should be any of the following value ${answerOptions.map(option => option.URI)}`;
                            break;
                        }
                    }
                    if (value !== null && value !== undefined && typeof value !== 'string') {
                        dataValidationResult = SetAnswerResponseType.ERROR;
                        dataValidationMessage = `${value} is Must be a string`;
                        break;
                    }
                    if (value !== null && value !== undefined && !isUri.isValid(value)) {
                        dataValidationResult = SetAnswerResponseType.ERROR;
                        dataValidationMessage = `${value} is not a valid URI`;
                        break;
                    }

                    answerInstance.set("choiceAnswerValue", value);
                    break;
                case TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    if (value !== null && value !== undefined && !moment(value).isValid()) {
                        dataValidationResult = SetAnswerResponseType.ERROR;
                        dataValidationMessage = `${value} is not a valid date`;
                        break;
                    }
                    answerInstance.set("dateTimeAnswerValue", new Date(value).getTime());
                    break;
                case TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    answerInstance.set("longTextAnswerValue", value);
                    break;
                case TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    answerInstance.set("fileAnswerValueURI", value);
                    break;
                case TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.get("haleyAnswerDataType");
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyCurrencyDataType") {
                        const v = typeof value === 'number'
                            ? value : typeof value === 'string' && (value || '')?.[0] === '$'
                            ? Number(value.slice(1).trim()) : Number(value);
                        if (Number.isNaN(v) || (value !== null && !isNumber(v))) {
                            dataValidationResult = SetAnswerResponseType.ERROR;
                            dataValidationMessage = `${value} is not a valid CurrencyDataType`;
                            break;
                        }
                        answerInstance.set("doubleAnswerValue", Number(v.toFixed(2)));
                    } else if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        if (value !== null && !Number.isInteger(value)) {
                            dataValidationResult = SetAnswerResponseType.ERROR;
                            dataValidationMessage = `The passed value should be an integer for and answer with HaleyIntegerDataType datatype. value: ${value}. answerURI: ${answer.URI}, answerInstanceURI: ${answerInstance.URI}`;
                            break;
                        }
                        answerInstance.set("integerAnswerValue", value);
                    } else {
                        if (value !== undefined && value !== null && Number.isNaN(value)) {
                            dataValidationResult = SetAnswerResponseType.ERROR;
                            dataValidationMessage = `value: ${value} is not an number, answer: ${JSON.stringify(answer)}, answerInstance: ${JSON.stringify(answerInstance)}`;
                            break;
                        }
                        answerInstance.set("doubleAnswerValue", value);
                    }
                    break;
                case TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    if (value !== null && value !== undefined && !Array.isArray(value)) {
                        dataValidationResult = SetAnswerResponseType.ERROR;
                        dataValidationMessage = `value ${value} is not an array multiChoiceAnswerValue.`;
                        break;
                    } else if (answerOptions && answerOptions.length && value) {
                        let shouldBreak = false
                        for (let v of value) {
                            if (!answerOptions.map(option => option.URI).includes(v)) {
                                dataValidationResult = SetAnswerResponseType.ERROR;
                                dataValidationMessage = `${v} is not a valid choice value for multiChoiceAnswerValue. It should be any of the following value ${answerOptions.map(option => option.URI)}`;
                                shouldBreak = true;
                                break;
                            }
                            if (typeof v !== 'string') {
                                dataValidationResult = SetAnswerResponseType.ERROR;
                                dataValidationMessage = `${value} Should be an array of string`;
                                break;
                            }
                        }
                        if (shouldBreak) break;
                    }
                    answerInstance.set("multiChoiceAnswerValue", value);
                    break;
                case TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    answerInstance.set("signatureAnswerValue", value);
                    break;
                case TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.set("taxonomyAnswerValue", value);
                    break;
    
                case TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomies = answerInstance.set("multiTaxonomyAnswerValue", value);
                    taxonomies = taxonomies ? taxonomies : [];
                    taxonomies.toString();
                    break;
                default:
                    console.error("No such questionType exists", answerInstance);
            }
        } else {
            dataValidationResult = 'Error';
            dataValidationMessage = 'No Answer Instance found';
        }

        return {
            dataValidationResult,
            dataValidationMessage,
            answerInstance,
        }
    };

    createVitalObject(vitaljs: VitalJs, type: string, properties: { [key: string]: any }={}): GraphObject {
        return createVitalObject(vitaljs, type, properties);
    }

    getValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string) {
        return GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType, this.vitaljs);
    }

    setValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string, value: any): SetAnswerResponseType {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, value, this.vitaljs);
    }

    resetValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string) {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, null, this.vitaljs);
    }

    getValueByAnswerTypeInsideRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    setValueByAnswerTypeInsideRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string, value: any): SetAnswerResponseType {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType);
        const answerOptions = QuestionAPI.getAnswerOptions(qaObjects, answer);
        return GroupAPI.setAnswerValue(answerInstance, answer, value, { answerOptions });
    }

    resetValueByAnswerTypeInsideRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType);
        return GroupAPI.setAnswerValue(answerInstance, answer, null);
    }

    getValueByAnswerTypeInsideRowRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    setValueByAnswerTypeInsideRowRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string, value: any): SetAnswerResponseType {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);
        const answerOptions = QuestionAPI.getAnswerOptions(qaObjects, answer);
        return GroupAPI.setAnswerValue(answerInstance, answer, value, { answerOptions });
    }

    resetValueByAnswerTypeInsideRowRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);
        return GroupAPI.setAnswerValue(answerInstance, answer, null);
    }

    getRowInstanceCountersByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string): string[] {
        return RowAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowType);
    }

    getRowRowInstanceCountersByRowRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string): string[] {
        return RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
    }

    // created the rowInstance objects to be added to qaInstanceObjects;
    createRowQaInstancesByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter?: string): GraphObject[] {
        return RowAPI.createRowQaInstancesByRowType(this.vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
    }

    addRowQaInstancesByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter?: string) {
        const instances = RowAPI.createRowQaInstancesByRowType(this.vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
        instances.forEach(ins => qaInstanceObjects.push(ins));
        return qaInstanceObjects;
    }

    // remove the rowInstance objects form qaInstanceObjects and return the updated 
    removeRowQaInstancesByRowTypeAndInstanceCounter(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string): GraphObject[] {
        return RowAPI.removeRowQaInstancesByRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter);
    }

    createRowRowQaInstancesByRowType(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter?: string): GraphObject[] {
        return RowAPI.createRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
    }

    addRowRowQaInstancesByRowType(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter?: string) {
        const instances = RowAPI.createRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
        instances.forEach(ins => qaInstanceObjects.push(ins));
        return qaInstanceObjects;
    }

    removeRowRowQaInstancesByRowTypeAndInstanceCounter(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter?: string): GraphObject[] {
        return RowAPI.removeRowRowQaInstancesByRowType(vitaljs, qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter);
    }

    updateRowInstanceCounterByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, counter: string): GraphObject {
        return RowAPI.updateRowInstanceCounterByRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, counter);
    }

    updateRowRowInstanceCountersByRowRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter: string, counter: string): GraphObject {
        return RowAPI.updateRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType, rowRowInstanceCounter, counter);
    }

    createQaInstanceObjects(qaObjects: GraphObject[], withRow=false, option: CreateQaInstancesOption={}) {
        let createdQaInstances: GraphObject[] = [];

        // 1 get group and create groupInstance.
        const groups = qaObjects.filter(obj => obj.type === TYPE_HALEY_GROUP);

        if (groups.length !== 1) {
            if (groups.length === 0) throw new Error('Passed in qaObjects should includes 1 HaleyGroup object. No detected');
            throw new Error(`More than on HaleyGroup object detected. Groups URI: ${groups.map(obj => obj.URI)}`);
        }

        const group = groups[0];
        if (option.groupInstance) option.groupInstance.set(SHORT_NAME_HALEY_GROUP, group.URI);
        const groupInstance = option.groupInstance || this.createGroupInstance(group);
        createdQaInstances = [groupInstance, ...createdQaInstances];

        const edgeToSections = qaObjects.filter(obj => obj.type === EDGE_SECTION && obj.get(SHORT_NAME_EDGE_SOURCE) === group.URI);
        const edgeToSectionURIs = edgeToSections.map(obj => obj.URI);
        const allSections = qaObjects.filter(obj => obj.type === TYPE_HALEY_SECTION);

        const sections = edgeToSections.map(edge => {
            const findSections = qaObjects.filter(obj => obj.URI === edge.get(SHORT_NAME_EDGE_DESTINATION));
            if (!findSections.length) {
                throw new Error(`Could not find the section object connected to edge ${edge.URI}, sectionURI: ${edge.get(SHORT_NAME_EDGE_DESTINATION)}`);
            }

            if (findSections.length > 1) {
                throw new Error(`Multiple section objects connected to edge ${edge.URI}}`);
            }

            return findSections[0];
        });

        if (edgeToSections.length !== allSections.length) {
            throw new Error(`Edge to section and section objects do not match. There are ${edgeToSections.length} edges that connected to sectionObject, and there are ${allSections.length} sectionObjects all together. `);
        }

        if (allSections.length !== sections.length) {
            throw new Error(`Section object does not match. There are ${allSections.length} section objects and only ${sections.length} of then connected to the group object.`);
        }

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== group.URI || edgeToSectionURIs.includes(obj.URI));
        
        for (const section of sections) {
            const { qaObjectsLeft: sectionQaObjectsLeft, createdInstances, sectionInstance } :  CreateSectionInstancesResult = SectionAPI.createQaInstanceObjects(this.vitaljs, section, qaObjectsLeft, withRow);
            qaObjectsLeft = sectionQaObjectsLeft;

            const edgeToSectionInstance = createEdgeObject(this.vitaljs, EDGE_SECTION_INSTANCE, groupInstance, sectionInstance);

            createdQaInstances = [...createdQaInstances, edgeToSectionInstance, ...createdInstances];
        }

        // if (qaObjectsLeft.length !== 0) {
        //     throw new Error(`Some additional objects exist that are not in the qa-tree. Redundant objects: ${qaObjectsLeft.map(obj => obj.URI)}`);
        // }

        return createdQaInstances;

    }

    getRowTypes(qaObjects: GraphObject[]): string[] {
        return RowAPI.getRowTypes(qaObjects);
    }

    getRowTypesInRow(qaObjects: GraphObject[], rowType: string): string[] {
        return RowAPI.getRowTypesInRow(qaObjects, rowType);
    }

    generateRowInstanceCounter(index: number) {
        return RowAPI.generateRowInstanceCounter(index);
    }

    splitGroupAndInstances(qaObjects: GraphObject[]): SplitGraph {
        let groupContainers: GroupGraphContainer[] = [];
        let groupInstanceContainers: GroupInstanceGraphContainer[] = [];

        const mappingUtil = new MappingUtil(qaObjects);

        let groups = mappingUtil.getObjectsByType(TYPE_HALEY_GROUP);
        const groupInstances = mappingUtil.getObjectsByType(TYPE_HALEY_GROUP_INSTANCE);

        const matched = new Map<string, GraphObject>();

        // initialized graph containers.
        groupInstances.forEach(groupInstance => {
            let graph: GraphObject[] = [];
            buildQaGraph(groupInstance, graph, mappingUtil);
            const container = new GroupInstanceGraphContainer(graph, groupInstance);
            groupInstanceContainers.push(container);

            graph.forEach(obj => matched.set(obj.URI, obj));
        });

        groups.forEach(group => {
            let graph: GraphObject[] = [];
            buildQaGraph(group, graph, mappingUtil);
            const container = new GroupGraphContainer(graph, group);
            groupContainers.push(container);

            graph.forEach(obj => matched.set(obj.URI, obj));
        });

        const objectLeft = qaObjects.filter(obj => !matched.has(obj.URI));

        return {
            groupGraphContainerList: groupContainers,
            instanceGraphContainerList: groupInstanceContainers,
            generalGraphObjects: new GeneralGraphContainer(objectLeft),
        };
    }

    setValue(setValueProp: SetValueProp) {
        const { value } = setValueProp;
        const [answer, answerInstance] = this.getAnswerAndAnswerInstance(setValueProp);
        this.logger.info(`setting value ${value} for instance: `, answerInstance?.URI)
        GroupAPI.setAnswerValue(answerInstance, answer, value);
        return answerInstance;
    }

    getValue(getValueProp: GetValueProp) {
        const [answer, answerInstance] = this.getAnswerAndAnswerInstance(getValueProp);
        this.logger.info('getting value from answerInstance: ', answerInstance?.URI)
        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    getAll() {
        return this.msgRL.iterator();
    }

    getAnswerAndAnswerInstance(getValueProp: GetValueProp) {
        const { rowType, rowCounter, answerType } = getValueProp;
        const answers: GraphObject[] = this.msgRL.iterator(TYPE_HALEY_ANSWER);
        const answerInstances: GraphObject[] = this.msgRL.iterator(TYPE_HALEY_ANSWER_INSTANCE);

        let answer: GraphObject;
        let answerInstance: GraphObject;

        if (!rowType && !rowCounter && answerType) {
            answer = answers.find(ans => ans.get(SHORT_NAME_HALEY_ANSWER_TYPE) === answerType);
            answerInstance = answerInstances.find(ins => ins.get(SHORT_NAME_HALEY_ANSWER) === answer.URI);
        }

        this.logger.info('get answerURI', answer?.URI);
        this.logger.info('get answerInstanceURI', answerInstance?.URI);

        return [answer, answerInstance];
    }

    private createGroupInstance(group: GraphObject) {
        const obj = createVitalObject(this.vitaljs, TYPE_HALEY_GROUP_INSTANCE);
        obj.set(SHORT_NAME_HALEY_GROUP, group.URI);
        return obj;
    }

}
