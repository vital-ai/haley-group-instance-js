import {
    VitalJs,
    GraphObject,
    MsgRL,
    SetValueProp,
    GetValueProp,
    Logger,
    CreateSectionInstancesResult
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
} from '../util/constant';
import { SectionAPI } from '../section-api/section-api';
import { RowAPI } from '../row-api/index';
import {
    createVitalObject,
    createEdgeObject
} from '../util/util';

export class GroupAPI {

    static logger: Logger;
    static vitaljs: VitalJs;
    logger: Logger;
    vitaljs: VitalJs;
    objList: GraphObject[];
    instanceList: GraphObject[];
    msgRL: MsgRL;
    
    constructor(vitaljs: VitalJs, logger?: Logger, ) {
        GroupAPI.logger = logger;
        if (!GroupAPI.vitaljs) {
            GroupAPI.vitaljs = vitaljs;
        } else if (GroupAPI.logger) {
            GroupAPI.logger.info('vitaljs has already been initialized');
        }

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

    static setValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string, value: any, vitaljs?: VitalJs) {
        if (!vitaljs && !GroupAPI.vitaljs) {
            throw new Error('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
        }
        const msgRL = (vitaljs || GroupAPI.vitaljs).resultList();
        (qaObjects || []).forEach(obj => msgRL.addResult(obj));
        (qaInstanceObjects || []).forEach(obj => msgRL.addResult(obj));

        const [answer, answerInstance] =  GroupAPI.getAnswerAndAnswerInstance({ answerType }, msgRL);

        if (GroupAPI.logger) GroupAPI.logger.info(`setting value ${value} for instance: `, answerInstance?.URI)

        GroupAPI.setAnswerValue(answerInstance, answer, value);

        return answerInstance;
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
                    return new Date(answerInstance.get("dateTimeAnswerValue"));
    
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

    private static setAnswerValue(answerInstance: GraphObject, answerObj: GraphObject, value: any) {
        // console.log('_getAnswerValue');
        if (answerInstance) {
            switch (answerInstance.type) {
                case TYPE_HALEY_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("textAnswerValue", value);
    
                case TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE:
                    return answerInstance.set("booleanAnswerValue", value);
    
                case TYPE_HALEY_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("choiceAnswerValue", value);
    
                case TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE:
                    return new Date(answerInstance.set("dateTimeAnswerValue", value));
    
                case TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE:
                    return answerInstance.set("longTextAnswerValue", value);
    
                case TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE:
                    return answerInstance.set("fileAnswerValueURI", value);
    
                case TYPE_HALEY_NUMBER_ANSWER_INSTANCE:
                    var answer = answerObj;
                    var answerDataType = answer.set("haleyAnswerDataType", value);
                    if (answerDataType === "http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType") {
                        return answerInstance.set("integerAnswerValue", value);
                    } else {
                        return answerInstance.set("doubleAnswerValue", value);
                    }
    
                case TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE:
                    return answerInstance.set("multiChoiceAnswerValue", value);
    
                case TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE:
                    return answerInstance.set("signatureAnswerValue", value);
    
                case TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomy = answerInstance.set("taxonomyAnswerValue", value);
                    return taxonomy || "";
    
                case TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE:
                    var taxonomies = answerInstance.set("multiTaxonomyAnswerValue", value);
                    taxonomies = taxonomies ? taxonomies : [];
    
                    return taxonomies.toString();
    
                default:
                    console.error("No such questionType exists", answerInstance);
            }
        }
        return null;
    };

    getValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string) {
        return GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType, this.vitaljs);
    }

    setValueByAnswerType (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], answerType: string, value: any) {
        return GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, value, this.vitaljs);
    }

    getValueByAnswerTypeInsideRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    setValueByAnswerTypeInsideRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string, value: any) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType);
        return GroupAPI.setAnswerValue(answerInstance, answer, value);
    }

    getValueByAnswerTypeInsideRowRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);
        return GroupAPI.getAnswerValue(answerInstance, answer);
    }

    setValueByAnswerTypeInsideRowRow (qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string, value: any) {
        const [answer, answerInstance] =  RowAPI.getAnswerPairByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);
        return GroupAPI.setAnswerValue(answerInstance, answer, value);
    }

    createQaInstanceObjects(qaObjects: GraphObject[], withRow=false) {
        let createdQaInstances: GraphObject[] = [];

        // 1 get group and create groupInstance.
        const groups = qaObjects.filter(obj => obj.type === TYPE_HALEY_GROUP);

        if (groups.length !== 1) {
            if (groups.length === 0) throw new Error('Passed in qaObjects should includes 1 HaleyGroup object. No detected');
            throw new Error(`More than on HaleyGroup object detected. Groups URI: ${groups.map(obj => obj.URI)}`);
        }

        const group = groups[0];
        const groupInstance = this.createGroupInstance(group);
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

    createRowQaInstances(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], row: GraphObject, rowInstanceCounter: string="A") {

    }

    getRowInstanceCountersByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string): string[] {
        return RowAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowType);
    }

    getRowRowInstanceCountersByRowRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string): string[] {
        return RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
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
