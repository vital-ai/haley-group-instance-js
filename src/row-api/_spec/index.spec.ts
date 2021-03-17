import { RowAPI } from '../index';
import { GroupAPI } from '../../group-api/group-api';
import { GraphObject } from '../../util/type';
import {
    redundantObject,
    dataTestRowMissingQuestion,
    dataTestRow,
    dataTestRowMissingRow,
    dataTestGroup,
    dataTestGroup2,
    group1,
    edgeGroupToSection,
    rootSection1,
    edgeRootSectionToRow1,
    rootRow,
    edgeRootRowToQuestion1,
    firstLevelQuestion1,
    edgeFirstLevelQuestionToAnswer1,
    firstLevelAnswer1,
    secondLevelRow,
    secondLevelQuestion1,
    secondLevelAnswer1,
} from './mock.data';
import {
    SHORT_NAME_HALEY_ROW,
    TYPE_HALEY_ROW_INSTANCE,
    EDGE_ROW_INSTANCE,
    EDGE_QUESTION_INSTANCE,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_HALEY_ANSWER,
    TYPE_HALEY_QUESTION_INSTANCE,
    SHORT_NAME_HALEY_QUESTION,
    EDGE_ANSWER_INSTANCE,
    SHORT_NAME_EDGE_DESTINATION,
    TYPE_HALEY_TEXT_ANSWER_INSTANCE,
    TYPE_HALEY_ROW,
    SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER,
    SHORT_NAME_TEXT_ANSWER_VALUE,
    SHORT_NAME_HALEY_ROW_TYPE_URI,
    SHORT_NAME_HALEY_ANSWER_TYPE
} from '../../util/constant';

const { vitaljs } = require('../../../test-util');

describe('RowAPI', () => {

    describe('createRowInstance', () => {
        it('Should create rowInstance', () => {
            const row = vitaljs.graphObject({ type: TYPE_HALEY_ROW, URI: 'mock:row-uri' });
            const rowInstance = RowAPI.createRowInstance(vitaljs, row);
            expect(rowInstance.type).toBe(TYPE_HALEY_ROW_INSTANCE);
            expect(rowInstance.get(SHORT_NAME_HALEY_ROW)).toEqual(row.URI);
        });
    });

    describe('createQaInstanceObjects', () => {
        it('Should throw error if no question found to connected to the edge_hasHaleyQuestion', () => {
           dataTestRowMissingQuestion.forEach(obj => vitaljs.graphObject(obj));
            const row =dataTestRowMissingQuestion.find(obj => obj.type === TYPE_HALEY_ROW) as any as GraphObject;
            try {
                RowAPI.createQaInstanceObjects(vitaljs, row, dataTestRowMissingQuestion as any as GraphObject[]);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Could not find the question object connected to edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293, questionURI: http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail');
            }
        });

        it('Should throw error if no row found to connected to edge_hasHaleyRow', () => {
            dataTestRowMissingRow.forEach(obj => vitaljs.graphObject(obj));
            const row =dataTestRowMissingRow.find(obj => obj.type === TYPE_HALEY_ROW) as any as GraphObject;
            try {
                RowAPI.createQaInstanceObjects(vitaljs, row, dataTestRowMissingRow as any as GraphObject[]);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Could not find the row object connected to edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_892829342384, rowURI http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            }
        });

        it('Should create instance objects', () => {
            dataTestRow.forEach(obj => vitaljs.graphObject(obj));
            const row = dataTestRow.find(obj => obj.type === TYPE_HALEY_ROW) as any as GraphObject;
            const { createdInstances, qaObjectsLeft, rowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, dataTestRow as any as GraphObject[]);
            expect(rowInstance.get(SHORT_NAME_HALEY_ROW)).toBe(row.URI);
            expect(createdInstances.length).toBe(11);

            const rowInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_ROW_INSTANCE && ins.get(SHORT_NAME_HALEY_ROW) === row.URI);
            expect(rowInstances).toEqual([rowInstance]);

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

            expect(qaObjectsLeft).toEqual([redundantObject]);

        });
    });

    describe('getAnswerPairByAnswerTypeInsideRow', () => {

        let qaInstanceObjects: GraphObject[];
        let groupAPI: any;
        const rowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy";
        const answerType = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneNumber";
        const answerTypeInRow = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
        const rowInstanceCounter = '1';

        beforeAll(() => {
            groupAPI = new GroupAPI(vitaljs);
            dataTestGroup.forEach(obj => vitaljs.graphObject(obj));
            const rows = dataTestGroup.filter(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rows.forEach(obj => obj.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI));
            const answer = dataTestGroup.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress');
         });

        beforeEach(() => {
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup as any as GraphObject[], true);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-66666');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
        });

        it.each([
            [[group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1] as any as GraphObject[]],
        ])('Should throw error if no row found with specific rowType', (qaObjects) => {
            try {
                qaObjects.forEach((obj) => vitaljs.graphObject(obj));
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerType);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('No row found with rowType: http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy');
            }
        });

        it('Should throw error if multiple rows found with specific rowType', () => {
            const qaObjects = [group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1, rootRow, rootRow] as any as GraphObject[];
            
            qaObjects.forEach((obj) => vitaljs.graphObject(obj));
            const rows = qaObjects.filter(obj => obj.type === TYPE_HALEY_ROW && obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI) === rowTypeURI);
            rows.forEach(obj => obj.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI));
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerType);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Multiple rows found with rowType: http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy; row uris: http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row,http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            }
        });

        it.each([
            ['missing EdgeFromRowToQuestion', [group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1, rootRow, firstLevelQuestion1, edgeFirstLevelQuestionToAnswer1, firstLevelAnswer1] as any as GraphObject[]],
            ['missing EdgeFromQuestionToAnswer', [group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1, rootRow, edgeRootRowToQuestion1, firstLevelQuestion1, firstLevelAnswer1] as any as GraphObject[]],
            ['missing Answer', [group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1, rootRow, edgeRootRowToQuestion1, firstLevelQuestion1, edgeFirstLevelQuestionToAnswer1] as any as GraphObject[]],
        ])('Should throw error if no answers found with specific answerType under one row: %s', (s, qaObjects) => {
            try {
                qaObjects.forEach((obj) => vitaljs.graphObject(obj));
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('No answer object found with answerType: http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy under rowType: http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy. Any of the following could be missing: edgeFromRowToQuestionObject, EdgeFromQuestionToAnswer, AnswerObject.');
            }
        });

        it('Should throw error if multiple answers found with specific answerType under one row', () => {
            const qaObjects = [group1, edgeGroupToSection, rootSection1, edgeRootSectionToRow1, rootRow, edgeRootRowToQuestion1, firstLevelQuestion1, edgeFirstLevelQuestionToAnswer1, firstLevelAnswer1, firstLevelAnswer1] as any as GraphObject[]
            
            qaObjects.forEach((obj) => vitaljs.graphObject(obj));
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Multiple answers found with answerType: http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy; answer uris: http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741,http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            }
        });

        it('Should throw error if no rowInstance found with the provided criteria: For no rowInstance', () => {
            qaInstanceObjects = qaInstanceObjects.filter(obj => obj.type !== TYPE_HALEY_ROW_INSTANCE);
            const qaObjects = dataTestGroup as any as GraphObject[];
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('No rowInstance found to connect row http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row with counter: 1');
            }
        });

        it('Should throw error if no rowInstance found with the provided criteria: for rowInstanceCounter', () => {
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE);
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '2');
            const qaObjects = dataTestGroup as any as GraphObject[];
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('No rowInstance found to connect row http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row with counter: 1');
            }
        });

        it('Should throw error if multiple rowInstances found with the provided criteria', () => {
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
            qaInstanceObjects.push(rowInstance);
            const qaObjects = dataTestGroup as any as GraphObject[];
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual(expect.stringContaining('Multiple rowInstances found to connect row http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row;'));
            }
        });

        it('Should throw error if no answerInstance found with the provided criteria', () => {
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === 'http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            qaInstanceObjects = qaInstanceObjects.filter(obj => obj.URI !== answerInstance.URI);
            const qaObjects = dataTestGroup as any as GraphObject[];
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('No matched answerInstance object found.');
            }
        });

        it('Should throw error if multiple answerInstances found with the provided criteria', () => {
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === 'http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            qaInstanceObjects.push(answerInstance);
            const qaObjects = dataTestGroup as any as GraphObject[];
            try {
                RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual(expect.stringContaining('Multiple matched answerInstances found. answerInstance uris:'));
            }
        });

        it('Should return answer/answerInstance', () => {
            const qaObjects = dataTestGroup as any as GraphObject[];
            
            const [answer, answerInstance] = RowAPI.getAnswerPairByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowTypeURI, answerTypeInRow);

            expect(answer.URI).toBe('http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            expect(answerInstance.get(SHORT_NAME_HALEY_ANSWER)).toBe('http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');

        });

    });

    describe('getRowRowPairUnderRowPair', () => {
        let qaInstanceObjects: GraphObject[];
        let groupAPI: any;
        const rowTypeURI = "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy";
        const answerType = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneNumber";
        const answerTypeInRow = "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
        const rowInstanceCounter = '1';
        let generatedRowRowInstance: GraphObject;

        beforeAll(() => {
            groupAPI = new GroupAPI(vitaljs);
            dataTestGroup2.forEach(obj => vitaljs.graphObject(obj));
            
            const answer = dataTestGroup2.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741');
            answer.set(SHORT_NAME_HALEY_ANSWER_TYPE, 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress');
         });

        beforeEach(() => {
            const rows = dataTestGroup2.filter(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rows.forEach(obj => obj.set(SHORT_NAME_HALEY_ROW_TYPE_URI, rowTypeURI));
            const rowRow = dataTestGroup2.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            rowRow.set(SHORT_NAME_HALEY_ROW_TYPE_URI, 'mock-row-row-type')
            qaInstanceObjects = groupAPI.createQaInstanceObjects(dataTestGroup2 as any as GraphObject[], true);
            const answerInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE && obj.get(SHORT_NAME_HALEY_ANSWER) === firstLevelAnswer1.URI);
            answerInstance.set(SHORT_NAME_TEXT_ANSWER_VALUE, '666-666-66666');
            const rowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, '1');
            const rootRowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === rootRow.URI);
            const edgeToRowRowInstance = qaInstanceObjects.find(obj => obj.type === EDGE_ROW_INSTANCE && obj.get(SHORT_NAME_EDGE_SOURCE) === rootRowInstance.URI);
            generatedRowRowInstance = qaInstanceObjects.find(obj => obj.URI === edgeToRowRowInstance.get(SHORT_NAME_EDGE_DESTINATION));
            generatedRowRowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, 'A');
        });

        it('Should throw error if No row with provided rowType', () => {
            vitaljs.graphObject(rootRow);
            const rowRow = dataTestGroup2.find(obj => obj.URI === 'http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            rowRow.set(SHORT_NAME_HALEY_ROW_TYPE_URI, 'test');
            const rootRowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === rootRow.URI);
            try {
                const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(dataTestGroup2, qaInstanceObjects, rootRow as any as GraphObject, rootRowInstance, 'A', 'mock-row-row-type');
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toBe('No row found with rowRowType: mock-row-row-type under row (http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row)');
            }
        });

        it('Should throw error if multiple rowInstances found to connect row with provided counter', () => {
            vitaljs.graphObject(rootRow);
            const rootRowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === rootRow.URI);
            qaInstanceObjects.push(generatedRowRowInstance);
            try {
                const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(dataTestGroup2, qaInstanceObjects, rootRow as any as GraphObject, rootRowInstance, 'A', 'mock-row-row-type');
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual(expect.stringContaining('Multiple rowInstances found to connect row http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row'));
            }
        });

        it('Should get row and rowInstance', () => {
            vitaljs.graphObject(rootRow);
            const rootRowInstance = qaInstanceObjects.find(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === rootRow.URI);
            const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(dataTestGroup2, qaInstanceObjects, rootRow as any as GraphObject, rootRowInstance, 'A', 'mock-row-row-type');
            expect(rowRow.URI).toEqual('http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
            expect(rowRowInstance.get(SHORT_NAME_HALEY_ROW)).toEqual('http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row');
        });
    });
});

