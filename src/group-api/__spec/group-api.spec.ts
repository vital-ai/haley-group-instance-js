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
    SHORT_NAME_HALEY_ROW_TYPE_URI
} from '../../util/constant';

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
            GroupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaa@bbbb.com');
            expect(GroupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType)).toEqual('aaaa@bbbb.com');
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
  
            const createdInstances = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[]);
            expect(createdInstances.length).toBe(19);

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
    });


    describe('getValueByAnswerTypeInsideRow', () => {

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
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[]);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-66666');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
         });

        it('Should set / get the value', () => {
            const qaObjects = dataTestGroup as any as GraphObject[];
            const value = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(value).toBe('666-666-66666');
            groupAPI.setValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow, '999-999-9999');
            const valueReset = groupAPI.getValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
            expect(valueReset).toEqual('999-999-9999');
        });
    });
    
});

