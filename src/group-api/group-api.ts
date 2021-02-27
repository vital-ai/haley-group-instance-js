import { VitalJs, GraphObject, MsgRL, SetValueProp, GetValueProp, Logger } from './type';
import {
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
} from './constant';

export class GroupAPI {

    vitaljs: VitalJs;
    logger: Logger;
    objList: GraphObject[];
    instanceList: GraphObject[];
    msgRL: MsgRL;
    
    constructor(vitaljs: VitalJs, logger: Logger, objList: GraphObject[], instanceList: GraphObject[]) {
        this.vitaljs = vitaljs;
        this.logger = logger;
        this.objList = objList;
        this.instanceList = instanceList;
        this.msgRL = vitaljs.resultList();
        (objList || []).forEach(obj => this.msgRL.addResult(obj));
        (instanceList || []).forEach(obj => this.msgRL.addResult(obj));
    }

    setValue(setValueProp: SetValueProp) {
        const { value, key } = setValueProp;
        const [answer, answerInstance] = this.getAnswerAndAnswerInstance(setValueProp);
        this.logger.info(`setting value ${value} for instance: `, answerInstance?.URI)
        this.setAnswerValue(answerInstance, answer, value);
        return answerInstance;
    }

    getValue(getValueProp: GetValueProp) {
        const [answer, answerInstance] = this.getAnswerAndAnswerInstance(getValueProp);
        this.logger.info('getting value from answerInstance: ', answerInstance?.URI)
        return this.getAnswerValue(answerInstance, answer);
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


    private getAnswerValue(answerInstance: GraphObject, answerObj: GraphObject) {
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

    private setAnswerValue(answerInstance: GraphObject, answerObj: GraphObject, value: any) {
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

}
