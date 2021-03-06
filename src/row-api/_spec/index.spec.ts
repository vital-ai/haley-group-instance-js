import { RowAPI } from '../index';
import { GraphObject } from '../../util/type';
import { redundantObject } from './mock.data';
import {
    dataTestRowMissingQuestion,
    dataTestRow,
    dataTestRowMissingRow,
    firstLevelQuestion1,
    firstLevelAnswer1,
    secondLevelRow,
    secondLevelAnswer1,
    secondLevelQuestion1
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
    })
    
});

