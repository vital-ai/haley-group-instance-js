import { GroupAPI } from '../group-api';
import { GraphObject } from '../../util/type';
import {
    data,
    dataTestGroup,
    dataTestGroupMissingSection,
    group1,
    rootSection1,
    rootQuestion1,
    rootAnswer1,
    rootRow,
    firstLevelQuestion1,
    firstLevelAnswer1,
    secondLevelRow,
    secondLevelQuestion1,
    secondLevelAnswer1,
    dataTestNumberData,
    mixMockData,
    dataTestBooleanData,
    dataTestChoiceData,
    dataTestMultiChoiceData,
} from './mock.data';
import {
    SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER,
    SHORT_NAME_HALEY_SECTION,
    TYPE_HALEY_SECTION_INSTANCE,
    EDGE_QUESTION_INSTANCE,
    SHORT_NAME_EDGE_SOURCE,
    TYPE_HALEY_QUESTION_INSTANCE,
    SHORT_NAME_EDGE_DESTINATION,
    SHORT_NAME_HALEY_QUESTION,
    EDGE_ANSWER_INSTANCE,
    TYPE_HALEY_TEXT_ANSWER_INSTANCE,
    SHORT_NAME_HALEY_ANSWER,
    EDGE_ROW_INSTANCE,
    TYPE_HALEY_ROW_INSTANCE,
    SHORT_NAME_HALEY_ROW,
    TYPE_HALEY_GROUP,
    TYPE_HALEY_GROUP_INSTANCE,
    SHORT_NAME_HALEY_GROUP,
    EDGE_SECTION_INSTANCE,
    SHORT_NAME_TEXT_ANSWER_VALUE,
    SHORT_NAME_HALEY_ROW_TYPE_URI,
    SHORT_NAME_HALEY_ANSWER_TYPE,
    SHORT_NAME_FOLLOWUP_TYPE,
    TYPE_FOLLOWUP_FIRM_ANSWER,
    TYPE_FOLLOWUP_NO_ANSWER,
    SHORT_NAME_HALEY_ANSWER_DATA_TYPE,
    MAPPING_ANSWER_TO_ANSWER_INSTANCE,
    TYPE_HALEY_ROW,
    TYPE_HALEY_QUESTION,
} from '../../util/type-haley-ai-question';
import { cloneDeep, shuffle } from 'lodash';
import { createVitalObject } from '../../util/util';
import { SplitGraph } from '../type';
import { TYPE_SUBMISSION_INQUIRY, TYPE_SUBMISSION } from '../../util/type-harbor-domains';
import { TYPE_HALEY_TEXT_ANSWER, TYPE_HALEY_SECTION, EDGE_ANSWER } from '../../util/type-haley-ai-question';
import {
    ANSWER_TYPE_AUTHOR_NAME,
    ANSWER_TYPE_FORMATTED_ADDRESS,
    ANSWER_TYPE_NAME,
    ANSWER_TYPE_PHOTOS,
    ANSWER_TYPE_PLACE_ID,
    ANSWER_TYPE_REVIEW_RATING,
    ROW_TYPE_PHOTO, ROW_TYPE_REVIEW
} from '../../util/type-google-place';

const { vitaljs } = require('../../../test-util');

describe('GroupAPI', () => {

    let qaObjects: GraphObject[] = [];
    let qaInstanceObjects: GraphObject[] = [];
    let answerType = '';
    let groupAPI: GroupAPI = null;

    describe('Throw error if vitaljs is not initialized', () => {
        it('Should throw error if vitaljs is not initialized if getValueByAnswerType called', () => {
            try {
                GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType);
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
            }
        });

        it('Should throw error if vitaljs is not initialized if setValueByAnswerType called', () => {
            try {
                const value = ''
                GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, value);
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual('vitaljs should be initialize first either by the constructor or by assign the value to the class directly');
            }
        });
    });

    describe('setValueByAnswerType', () => {
        let testData = cloneDeep(dataTestNumberData);
        let testBooleanData = cloneDeep(dataTestBooleanData);
        let testChoiceData = cloneDeep(dataTestChoiceData);
        let testMultiChoiceData = cloneDeep(dataTestMultiChoiceData);
        const logger = {
            info: console.log,
            error: console.error,
        };
        beforeAll(() => {
           groupAPI = new GroupAPI(vitaljs);
        });

        it('Should get the value', () => {
            data.forEach(obj => vitaljs.graphObject(obj) as GraphObject);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress';
            const qaObjects = data as any as GraphObject[];
            const qaInstanceObjects: GraphObject[] = [];
            const answerInstance = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073224_788433299');
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaa@bbbb.com');
            expect(groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType)).toEqual('aaaa@bbbb.com');
            expect(answerInstance.get(SHORT_NAME_FOLLOWUP_TYPE)).toEqual(TYPE_FOLLOWUP_FIRM_ANSWER);
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, null);
            expect(groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType)).toBeUndefined();
            expect(answerInstance.get(SHORT_NAME_FOLLOWUP_TYPE)).toEqual(TYPE_FOLLOWUP_NO_ANSWER);
        });

        it('Should throw error if the passed in value is a float value while the dataType specific it should be an integer', () => {
            const qaObjects = cloneDeep(testData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_NUMBER';
            const dataType = 'http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyNumberAnswer/1597780220321_957219729');

            answer.set(SHORT_NAME_HALEY_ANSWER_DATA_TYPE, dataType);
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            const result = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 3.4);
            expect(result).toEqual(expect.objectContaining({
                dataValidationMessage: expect.stringContaining('The passed value should be an integer for and answer with HaleyIntegerDataType datatype. value: 3.4'),
                dataValidationResult: "Error",
            }));
        });

        it('Should set the integer value', () => {
            const qaObjects = cloneDeep(testData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_NUMBER';
            const dataType = 'http://vital.ai/ontology/haley-ai-question#HaleyIntegerDataType';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyNumberAnswer/1597780220321_957219729');

            answer.set(SHORT_NAME_HALEY_ANSWER_DATA_TYPE, dataType);
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 3);
            expect(groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType)).toEqual(3);
        });

        it('Should throw error if the passed value is not boolean or null value for boolean answers', () => {
            const qaObjects = cloneDeep(testBooleanData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/IS_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyBooleanAnswer/1597780220321_957219729');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);

            const result = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaaa');
            expect(result).toEqual(expect.objectContaining({
                dataValidationMessage: 'aaaaa is not a valid boolean value for booleanAnswerValue',
                dataValidationResult: "Error",
            }));
        });

        it('Should set the boolean value', () => {
            const qaObjects = cloneDeep(testBooleanData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/IS_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyBooleanAnswer/1597780220321_957219729');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, true);
            const value = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType);

            expect(value).toBe(true);
        });

        it('Should throw error if the passed value is not in option list for choice answers', () => {
            const qaObjects = cloneDeep(testChoiceData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/TYPE_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            const result = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaaa');
            expect(result).toEqual(expect.objectContaining({
                dataValidationMessage: 'aaaaa is not a valid choice value for choiceAnswerValue. It should be any of the following value http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1,http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/2',
                dataValidationResult: "Error",
            }));
        });

        it('Should set the choice answer', () => {
            const qaObjects = cloneDeep(testChoiceData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/TYPE_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/2');
            const value = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType);

            expect(value).toEqual('http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/2');
        });

        it('Should throw error if the passed value is not a list for multi choice answers', () => {
            const qaObjects = cloneDeep(testMultiChoiceData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/TYPE_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyMultiChoiceAnswer/1');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            const result = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaaa');
            expect(result).toEqual(expect.objectContaining({
                dataValidationMessage: 'value aaaaa is not an array multiChoiceAnswerValue.',
                dataValidationResult: "Error",
            }));
        });

        it('Should throw error if the passed value is not in the option list for multi choice answers', () => {
            const qaObjects = cloneDeep(testMultiChoiceData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/TYPE_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyMultiChoiceAnswer/1');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            const result = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, ['aaaaa']);
            expect(result).toEqual(expect.objectContaining({
                dataValidationMessage: expect.stringContaining('aaaaa is not a valid choice value for multiChoiceAnswerValue. It should be any of the following value'),
                dataValidationResult: "Error",
            }));
        });

        it('Should set the Multichoice answer', () => {
            const qaObjects = cloneDeep(testMultiChoiceData);
            qaObjects.forEach(obj => vitaljs.graphObject(obj));
            const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);
            const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/TYPE_INSURED';
            const answer = qaObjects.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyMultiChoiceAnswer/1');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerType);
            groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, ['http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/2']);
            const value = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType);

            expect(value).toEqual(['http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/2']);
        });
    });

    describe('createQaInstanceObjects', () => {

        it('Should throw error if no section found to connected to the edge_hasHaleySection', () => {
            dataTestGroupMissingSection.forEach(obj => vitaljs.graphObject(obj));
             const group = dataTestGroupMissingSection.find(obj => obj.type === TYPE_HALEY_GROUP) as any as GraphObject;
             try {
                 groupAPI.createQaInstanceObjects(dataTestGroupMissingSection as any as GraphObject[]);
                 expect(true).toBe(false);
             } catch(error) {
                 expect(error.message).toEqual('Could not find the section object connected to edge http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345, sectionURI: http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo');
             }
         });
 
         it('Should create instance objects', () => {
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));
  
            const createdInstances = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true);
            expect(createdInstances.length).toBe(19);

            createdInstances
                .filter(instance => Array.from(MAPPING_ANSWER_TO_ANSWER_INSTANCE.values()).includes(instance.type))
                .forEach(instance => {
                    expect(instance.get(SHORT_NAME_FOLLOWUP_TYPE)).toEqual(TYPE_FOLLOWUP_NO_ANSWER);
                });

            const groupInstance = createdInstances.find(obj => obj.type === TYPE_HALEY_GROUP_INSTANCE);
            expect(groupInstance.get(SHORT_NAME_HALEY_GROUP)).toEqual(group1.URI);
            const edgeToSectionInstances = createdInstances.filter(obj => obj.type === EDGE_SECTION_INSTANCE && obj.get(SHORT_NAME_EDGE_SOURCE) === groupInstance.URI);
            expect(edgeToSectionInstances.length).toBe(1);

            const sectionInstances = createdInstances.filter(obj => obj.type === TYPE_HALEY_SECTION_INSTANCE && edgeToSectionInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === obj.URI);
            expect(sectionInstances.length).toBe(1);
            expect(sectionInstances[0].get(SHORT_NAME_HALEY_SECTION)).toBe(rootSection1.URI);

            const sectionLevelEdgeToQuestions = createdInstances.filter(ins => ins.type === EDGE_QUESTION_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === sectionInstances[0].URI);
            expect(sectionLevelEdgeToQuestions.length).toBe(1);

            const sectionLevelQuestionInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_QUESTION_INSTANCE && sectionLevelEdgeToQuestions[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(sectionLevelQuestionInstances.length).toBe(1);
            expect(sectionLevelQuestionInstances[0].get(SHORT_NAME_HALEY_QUESTION)).toBe(rootQuestion1.URI);

            const sectionLevelEdgeToAnswerInstances = createdInstances.filter(ins => ins.type === EDGE_ANSWER_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === sectionLevelQuestionInstances[0].URI);
            expect(sectionLevelEdgeToAnswerInstances.length).toBe(1);

            const sectionLevelAnswerInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && sectionLevelEdgeToAnswerInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(sectionLevelAnswerInstances.length).toBe(1);
            expect(sectionLevelAnswerInstances[0].get(SHORT_NAME_HALEY_ANSWER)).toBe(rootAnswer1.URI);

            const edgeSectionInstanceToRowInstances = createdInstances.filter(ins => ins.type === EDGE_ROW_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === sectionInstances[0].URI);
            expect(edgeSectionInstanceToRowInstances.length).toBe(1);

            const rowInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_ROW_INSTANCE && edgeSectionInstanceToRowInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(rowInstances.length).toBe(1);
            expect(rowInstances[0].get(SHORT_NAME_HALEY_ROW)).toBe(rootRow.URI); 
            const rowInstance = rowInstances[0];

            const firstLevelEdgeToQuestions = createdInstances.filter(ins => ins.type === EDGE_QUESTION_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === rowInstance.URI);
            expect(firstLevelEdgeToQuestions.length).toBe(1);

            const firstLevelQuestionInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_QUESTION_INSTANCE && firstLevelEdgeToQuestions[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(firstLevelQuestionInstances.length).toBe(1);
            expect(firstLevelQuestionInstances[0].get(SHORT_NAME_HALEY_QUESTION)).toBe(firstLevelQuestion1.URI);

            const firstLevelEdgeToAnswerInstances = createdInstances.filter(ins => ins.type === EDGE_ANSWER_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === firstLevelQuestionInstances[0].URI);
            expect(firstLevelEdgeToAnswerInstances.length).toBe(1);

            const firstLevelAnswerInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && firstLevelEdgeToAnswerInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(firstLevelAnswerInstances.length).toBe(1);
            expect(firstLevelAnswerInstances[0].get(SHORT_NAME_HALEY_ANSWER)).toBe(firstLevelAnswer1.URI);

            const edgeToSecondLevelRowInstances = createdInstances.filter(edge => edge.type === EDGE_ROW_INSTANCE && edge.get(SHORT_NAME_EDGE_SOURCE) === rowInstance.URI);
            expect(edgeToSecondLevelRowInstances.length).toBe(1);

            const secondLevelRowInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_ROW_INSTANCE && edgeToSecondLevelRowInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(secondLevelRowInstances.length).toBe(1);
            expect(secondLevelRowInstances[0].get(SHORT_NAME_HALEY_ROW)).toBe(secondLevelRow.URI);

            const secondLevelEdgeToQuestions = createdInstances.filter(ins => ins.type === EDGE_QUESTION_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === secondLevelRowInstances[0].URI);
            expect(secondLevelEdgeToQuestions.length).toBe(1);

            const secondLevelQuestionInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_QUESTION_INSTANCE && secondLevelEdgeToQuestions[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(secondLevelQuestionInstances.length).toBe(1);
            expect(secondLevelQuestionInstances[0].get(SHORT_NAME_HALEY_QUESTION)).toBe(secondLevelQuestion1.URI);

            const secondLevelEdgeToAnswerInstances = createdInstances.filter(ins => ins.type === EDGE_ANSWER_INSTANCE && ins.get(SHORT_NAME_EDGE_SOURCE) === secondLevelQuestionInstances[0].URI);
            expect(secondLevelEdgeToAnswerInstances.length).toBe(1);

            const secondLevelAnswerInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && secondLevelEdgeToAnswerInstances[0].get(SHORT_NAME_EDGE_DESTINATION) === ins.URI);
            expect(secondLevelAnswerInstances.length).toBe(1);
            expect(secondLevelAnswerInstances[0].get(SHORT_NAME_HALEY_ANSWER)).toBe(secondLevelAnswer1.URI);
 
         });

         it('Should accept the passed in groupInstance', () => {
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));

            const passedInGroupInstance = createVitalObject(vitaljs, TYPE_HALEY_GROUP_INSTANCE);
            passedInGroupInstance.URI = 'mock-group-uri';
  
            const createdInstances = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true, { groupInstance: passedInGroupInstance });

            const groupInstance = createdInstances.find(ins => ins.type === TYPE_HALEY_GROUP_INSTANCE);
            const group = dataTestGroup.find(obj => obj.type === TYPE_HALEY_GROUP);
            expect(groupInstance.URI).toBe('mock-group-uri');
            expect(groupInstance.get(SHORT_NAME_HALEY_GROUP)).toBe(group.URI);
         });
    });

    describe('set/getValueByAnswerTypeInsideRow', () => {

        let qaInstanceObjects: GraphObject[];
        let groupAPI: GroupAPI;
        const rowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy";
        const answerTypeInRow = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
        const rowInstanceCounter = '1';

        beforeAll(() => {
            groupAPI = new GroupAPI(vitaljs);
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));
            const rows = dataTestGroup.filter(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rows.forEach(obj => obj.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI));
         });

         beforeEach(() => {
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-66666');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
         });

        it('Should set / get the value', () => {
            const qaObjects = dataTestGroup as any as GraphObject[];
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            const value = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(value).toBe('666-666-66666');
            groupAPI.setValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow, '999-999-9999');
            const valueReset = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(valueReset).toEqual('999-999-9999');
            expect(answerInstance.get(SHORT_NAME_TEXT_ANSWER_VALUE)).toEqual('999-999-9999');
            expect(answerInstance.get(SHORT_NAME_FOLLOWUP_TYPE)).toEqual(TYPE_FOLLOWUP_FIRM_ANSWER);

            groupAPI.resetValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            const resetValue = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(answerInstance.get(SHORT_NAME_TEXT_ANSWER_VALUE)).toBeUndefined();
            expect(answerInstance.get(SHORT_NAME_FOLLOWUP_TYPE)).toEqual(TYPE_FOLLOWUP_NO_ANSWER);

        });
    });

    describe('set/getValueByAnswerTypeInsideRowRow', () => {

        let qaInstanceObjects: GraphObject[];
        let groupAPI: GroupAPI;
        const rowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy";
        const rowRowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Location";
        const answerTypeInRowRow = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_SecondaryEmailAddress";
        const rowInstanceCounter = '1';
        const rowRowInstanceCounter = 'A';

        beforeAll(() => {
            groupAPI = new GroupAPI(vitaljs);
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));
            const row = dataTestGroup.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            const rowRow = dataTestGroup.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            const rowRowAnswer = dataTestGroup.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_0352345803');
            row.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI);
            rowRow.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowRowTypeURI);
            rowRowAnswer.set(SHORT_NAME_HALEY_ANSWER_TYPE, answerTypeInRowRow);
         });

         beforeEach(() => {
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            const rowRowAnswerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === secondLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-6666');
            rowRowAnswerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '888-888-8888');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            const rowRowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, rowInstanceCounter);
            rowRowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, rowRowInstanceCounter);
         });

        it('Should set / get the value', () => {
            const qaObjects = dataTestGroup as any as GraphObject[];
            const value = groupAPI.getValueByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, rowRowInstanceCounter, rowRowTypeURI, answerTypeInRowRow);
            expect(value).toBe('888-888-8888');
            groupAPI.setValueByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, rowRowInstanceCounter, rowRowTypeURI, answerTypeInRowRow, '999-999-9999');
            const valueReset = groupAPI.getValueByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, rowRowInstanceCounter, rowRowTypeURI, answerTypeInRowRow);
            expect(valueReset).toEqual('999-999-9999');
        });
    });

    describe('splitGroupAndInstances', () => {
        const cloneQaObjects = cloneDeep(mixMockData);
        let qaObjects: GraphObject[];

        let qaInstanceObjects: GraphObject[];
        let qaInstanceObjects1: GraphObject[];
        let groupAPI: GroupAPI;
        const rowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy";
        const answerTypeInRow = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
        const rowInstanceCounter = '1';

        beforeAll(() => {
            groupAPI = new GroupAPI(vitaljs);
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));
            const rows = dataTestGroup.filter(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rows.forEach(obj => obj.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI));
        });

        beforeEach(() => {
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true);
            qaInstanceObjects1 = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[]);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-66666');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
        });

        it('Should split into two graphContainer', () => {
            const allObjects = shuffle([...dataTestGroup, ...qaInstanceObjects, ...qaInstanceObjects1]);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(allObjects);

            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            expect(groupGraphContainerList.length).toEqual(1);
            expect(groupGraphContainerList[0].groupURI).toEqual('http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo');
            expect(instanceGraphContainerList.length).toEqual(2);
            expect(instanceGraphContainerList[0].groupInstance.get(SHORT_NAME_HALEY_GROUP)).toEqual(groupGraphContainerList[0].groupURI);
            expect(instanceGraphContainerList[1].groupInstance.get(SHORT_NAME_HALEY_GROUP)).toEqual(groupGraphContainerList[0].groupURI);
            expect(generalGraphObjects.all).toHaveLength(1);

            const qaInstanceObjectsSet1 = instanceGraphContainerList[0].all.length > instanceGraphContainerList[1].all.length ? instanceGraphContainerList[0].all : instanceGraphContainerList[1].all;
            const qaObjects1 = groupGraphContainerList[0].all;

            const answerInstance = qaInstanceObjectsSet1.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            const value = groupAPI.getValueByAnswerTypeInsideRow(qaObjects1, qaInstanceObjectsSet1, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(value).toBe('666-666-66666');
            groupAPI.setValueByAnswerTypeInsideRow(qaObjects1, qaInstanceObjectsSet1, rowInstanceCounter, rowTypeURI, answerTypeInRow, '999-999-9999');
            const valueReset = groupAPI.getValueByAnswerTypeInsideRow(qaObjects1, qaInstanceObjectsSet1, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(valueReset).toEqual('999-999-9999');
            expect(answerInstance.get(SHORT_NAME_TEXT_ANSWER_VALUE)).toEqual('999-999-9999');

            expect(groupGraphContainerList[0].isComplete).toBe(true);
            expect(instanceGraphContainerList[0].isComplete).toBe(true);
            expect(instanceGraphContainerList[1].isComplete).toBe(true);
        });
    });

    // need to generate the test-data.ndjson file to allow this test to pass. If non file ../../../test-data/test-data.ndjson and ./result-data exist. Then
    // the code below could be commented out.
    describe('test to split a big dataset of mixObjects', () => {
        let groupAPI: GroupAPI;
        let ndjsonObjects: any;
        let testObjects: GraphObject[];
        const { placeResults, updatedPlaceResults } = require('./result-data'); 

        beforeAll(async () => {
            const fs = require('fs');
            const path = require('path');
            const ndjson = require('ndjson');

            const readMisObjectsPromise = new Promise((resolve, reject) => {
                let mixObjects: GraphObject[] = [];
                fs.createReadStream(path.join(__dirname, '../../../test-data/test-data.ndjson'))
                    .pipe(ndjson.parse())
                    .on('data', (obj: GraphObject) => {
                        mixObjects.push(vitaljs.graphObject(obj));
                        if (mixObjects.length === 5489) {
                            resolve(mixObjects);
                        }
                    });
            });

            groupAPI = new GroupAPI(vitaljs);
            ndjsonObjects = (await readMisObjectsPromise) as any as GraphObject[];
        });

        beforeEach(() => {
            testObjects = (cloneDeep(ndjsonObjects) as any as GraphObject[]).map(obj => vitaljs.graphObject(JSON.parse(JSON.stringify(obj))));
        });

        it('Should split objects', async () => {
            const submission = createVitalObject(vitaljs, TYPE_SUBMISSION);
            const submissionInquiry = createVitalObject(vitaljs, TYPE_SUBMISSION_INQUIRY);
            testObjects = [submission, ...testObjects, submissionInquiry]
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            expect(groupGraphContainerList).toHaveLength(1);
            expect(instanceGraphContainerList).toHaveLength(40);
            expect(generalGraphObjects.all).toHaveLength(2);
            expect(generalGraphObjects.all.map(obj => obj.type)).toEqual(expect.arrayContaining([
                TYPE_SUBMISSION_INQUIRY,
                TYPE_SUBMISSION,
            ]));

            expect(groupGraphContainerList.every(obj => obj.isComplete)).toBe(true);
            expect(instanceGraphContainerList.every(obj => obj.isComplete)).toBe(true);
            expect(generalGraphObjects.isComplete).toBe(true);
        });

        it('Should detect incomplete graph if and question or questionInstance missing', () => {
            const firstQuestionObject = testObjects.find(obj => obj.type === TYPE_HALEY_QUESTION);
            const firstQuestionInstance = testObjects.find(obj => obj.type === TYPE_HALEY_QUESTION_INSTANCE);
            testObjects = testObjects.filter(obj => obj.URI !== firstQuestionObject.URI && obj.URI !== firstQuestionInstance.URI);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            const incompleteGroupGraph = groupGraphContainerList.find(obj => !obj.isComplete);
            const incompleteGroupInstanceGraph = instanceGraphContainerList.find(obj => !obj.isComplete);

            expect(incompleteGroupInstanceGraph).toBeDefined();
            expect(incompleteGroupInstanceGraph.incompleteMessages).toEqual([
                'Could not find the questionInstance object URI=http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1625936602206-77552360466, which is the destination of edge http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1625936602206-93598498873'
            ]);

            expect(incompleteGroupGraph).toBeDefined();
            expect(incompleteGroupGraph.incompleteMessages).toEqual([
                'Could not find the question object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/GooglePlace-Reviews-Review-AuthorName, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1617479903444_1076869282'
            ]);
        });

        it('Should detect incomplete graph if and answer or answerInstance missing', () => {
            const firstAnswerObject = testObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER);
            const firstAnswerInstance = testObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE);
            testObjects = testObjects.filter(obj => obj.URI !== firstAnswerObject.URI && obj.URI !== firstAnswerInstance.URI);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            const incompleteGroupGraph = groupGraphContainerList.find(obj => !obj.isComplete);
            const incompleteGroupInstanceGraph = instanceGraphContainerList.find(obj => !obj.isComplete);

            expect(incompleteGroupInstanceGraph).toBeDefined();
            expect(incompleteGroupInstanceGraph.incompleteMessages).toEqual([
                'Could not find the answerInstance object http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1625936603189-67327304859, which is the destination of edge http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1625936603189-87441066109'
            ]);

            expect(incompleteGroupGraph).toBeDefined();
            expect(incompleteGroupGraph.incompleteMessages).toEqual([
                'Could not find the answer object http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1617479903420_1076869217, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1617479903421_1076869218'
            ]);
        });

        it('Should detect incomplete graph if and section or sectionInstance missing', () => {
            const firstSectionObject = testObjects.find(obj => obj.type === TYPE_HALEY_SECTION);
            const firstSectionInstance = testObjects.find(obj => obj.type === TYPE_HALEY_SECTION_INSTANCE);
            testObjects = testObjects.filter(obj => obj.URI !== firstSectionObject.URI && obj.URI !== firstSectionInstance.URI);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            const incompleteGroupGraph = groupGraphContainerList.find(obj => !obj.isComplete);
            const incompleteGroupInstanceGraph = instanceGraphContainerList.find(obj => !obj.isComplete);

            expect(incompleteGroupInstanceGraph).toBeDefined();
            expect(incompleteGroupInstanceGraph.incompleteMessages).toEqual([
                'Could not find sectionInstance object http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1625936601588-79109287680, which is the destination object of Edge http://vital.ai/haley.ai/haley-saas/Edge_hasSectionInstance/1625936601652-95519809918'
            ]);

            expect(incompleteGroupGraph).toBeDefined();
            expect(incompleteGroupGraph.incompleteMessages).toEqual([
                'Could not find section object http://vital.ai/haley.ai/harbor-saas/HaleySection/GooglePlace-Hours, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1617479903546_1076869380'
            ]);
        });

        it('Should detect incomplete graph if and Row or RowInstance missing', () => {
            const firstRowObject = testObjects.find(obj => obj.type === TYPE_HALEY_ROW);
            const firstRowInstance = testObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE);
            testObjects = testObjects.filter(obj => obj.URI !== firstRowObject.URI && obj.URI !== firstRowInstance.URI);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            const incompleteGroupGraph = groupGraphContainerList.find(obj => !obj.isComplete);
            const incompleteGroupInstanceGraph = instanceGraphContainerList.find(obj => !obj.isComplete);

            expect(incompleteGroupInstanceGraph).toBeDefined();
            expect(incompleteGroupInstanceGraph.incompleteMessages).toEqual([
                'Could not find object http://vital.ai/haley.ai/haley-saas/HaleyRowInstance/1625936597050-44424995504, which is the destination object of Edge http://vital.ai/haley.ai/haley-saas/Edge_hasRowInstance/1625936597055-95997115838'
            ]);

            expect(incompleteGroupGraph).toBeDefined();
            expect(incompleteGroupGraph.incompleteMessages).toEqual([
                'Could not find object http://vital.ai/haley.ai/harbor-saas/HaleyRow/GooglePlace-Place-Photo, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1617479903413_1076869211'
            ]);
        });

        it('Should detect incomplete graph if and edgeToAnswer and edgeToAnswerInstance missing', () => {
            const firstEdgeToAnswer = testObjects.find(obj => obj.type === EDGE_ANSWER);
            const firstEdgeToAnswerInstance = testObjects.find(obj => obj.type === EDGE_ANSWER_INSTANCE);
            testObjects = testObjects.filter(obj => obj.URI !== firstEdgeToAnswer.URI && obj.URI !== firstEdgeToAnswerInstance.URI);
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
                generalGraphObjects,
            } = graph;

            const incompleteGroupGraph = groupGraphContainerList.find(obj => !obj.isComplete);
            const incompleteGroupInstanceGraph = instanceGraphContainerList.find(obj => !obj.isComplete);

            expect(incompleteGroupInstanceGraph).toBeDefined();
            expect(incompleteGroupInstanceGraph.incompleteMessages).toEqual([
                'Could not find any edge from questionInstance http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1625936596849-26501904102 to answer.'
            ]);

            expect(incompleteGroupGraph).toBeDefined();
            expect(incompleteGroupGraph.incompleteMessages).toEqual([
                'Could not find any edge from question http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/GooglePlace-Geometry-LocationLatitude to answer.'
            ]);
        });

        it('Should get all values from instance', () => {
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
            } = graph;

            const qaObjects = groupGraphContainerList[0].all;

            const results = instanceGraphContainerList.map(instanceContainer => {
                const qaInstanceObjects = instanceContainer.all;
                const placeId = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_PLACE_ID);
                const formattedAddress = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_FORMATTED_ADDRESS);
                const name = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_NAME);
                const reviewRowCounters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, ROW_TYPE_REVIEW);
                let reviews = reviewRowCounters.map(counter => {
                    const authorName = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_REVIEW, ANSWER_TYPE_AUTHOR_NAME);
                    const rating = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_REVIEW, ANSWER_TYPE_REVIEW_RATING);
                    return { authorName, rating };
                })

                const photoCounters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, ROW_TYPE_PHOTO);
                let photos = photoCounters.map(counter => {
                    const photo = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_PHOTO, ANSWER_TYPE_PHOTOS);
                    return photo;
                })
                return { name, formattedAddress, placeId, reviews, photos };
            });

            expect(results).toEqual(expect.arrayContaining(placeResults));
        });

        it('Should set values for instance', () => {
            const graph: SplitGraph = groupAPI.splitGroupAndInstances(testObjects as any as GraphObject[]);
            const {
                groupGraphContainerList,
                instanceGraphContainerList,
            } = graph;

            const qaObjects = groupGraphContainerList[0].all;

            instanceGraphContainerList.forEach(instanceContainer => {
                const qaInstanceObjects = instanceContainer.all;
                const placeId = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_PLACE_ID);
                const formattedAddress = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_FORMATTED_ADDRESS);
                const name = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_NAME);
                const result: any = groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_FORMATTED_ADDRESS, `updated-${formattedAddress}`);

                var value = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_FORMATTED_ADDRESS);
                groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_NAME, `updated-${name}`);

                const photoCounters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, ROW_TYPE_PHOTO);
                let photos = photoCounters.map(counter => {
                    const photo = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_PHOTO, ANSWER_TYPE_PHOTOS);
                    groupAPI.setValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_PHOTO, ANSWER_TYPE_PHOTOS, `update-${photo}`);
                });
            });

            const updatedResults = instanceGraphContainerList.map(instanceContainer => {
                const qaInstanceObjects = instanceContainer.all;
                const placeId = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_PLACE_ID);
                const formattedAddress = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_FORMATTED_ADDRESS);
                const name = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, ANSWER_TYPE_NAME);
                const reviewRowCounters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, ROW_TYPE_REVIEW);
                let reviews = reviewRowCounters.map(counter => {
                    const authorName = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_REVIEW, ANSWER_TYPE_AUTHOR_NAME);
                    const rating = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_REVIEW, ANSWER_TYPE_REVIEW_RATING);
                    return { authorName, rating };
                });

                const photoCounters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, ROW_TYPE_PHOTO);
                let photos = photoCounters.map(counter => {
                    const photo = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, counter, ROW_TYPE_PHOTO, ANSWER_TYPE_PHOTOS);
                    return photo;
                });
                return { name, formattedAddress, placeId, reviews, photos };
            });

            expect(updatedResults).toEqual(expect.arrayContaining(updatedPlaceResults));
        });
    });
    
});

