import { QuestionAPI } from '../index';
import { GraphObject } from '../../util/type';
import { dataTextQuestion, dataTextQuestionWithoutEdge, dataTextQuestionWithMultipleMatch } from './mock.data';
import {
    SHORT_NAME_HALEY_ANSWER,
    TYPE_HALEY_QUESTION_INSTANCE,
    SHORT_NAME_HALEY_QUESTION,
    EDGE_ANSWER_INSTANCE,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_EDGE_DESTINATION,
    TYPE_HALEY_QUESTION,
    TYPE_HALEY_TEXT_ANSWER,
    TYPE_HALEY_TEXT_ANSWER_INSTANCE,
    TYPE_HALEY_BOOLEAN_ANSWER,
    TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE,
    TYPE_HALEY_CHOICE_ANSWER,
    TYPE_HALEY_CHOICE_ANSWER_INSTANCE,
    TYPE_HALEY_DATE_TIME_ANSWER,
    TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE,
    TYPE_HALEY_LONG_TEXT_ANSWER,
    TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE,
    TYPE_HALEY_FILE_UPLOAD_ANSWER,
    TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE,
    TYPE_HALEY_NUMBER_ANSWER,
    TYPE_HALEY_NUMBER_ANSWER_INSTANCE,
    TYPE_HALEY_MULTI_CHOICE_ANSWER,
    TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE,
    TYPE_HALEY_SIGNATURE_ANSWER,
    TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE,
    TYPE_HALEY_TAXONOMY_ANSWER,
    TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE,
    TYPE_HALEY_MULTI_TAXONOMY_ANSWER,
    TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE,
} from '../../util/constant';

const { vitaljs } = require('../../../test-util');

describe('QuestionAPI', () => {

    describe('createQuestionInstance', () => {
        it('Should create questionInstance', () => {
            const question = vitaljs.graphObject({ type: TYPE_HALEY_QUESTION, URI: 'mock:question-uri' });
            const questionInstance = QuestionAPI.createQuestionInstance(vitaljs, question);
            expect(questionInstance.type).toBe(TYPE_HALEY_QUESTION_INSTANCE);
            expect(questionInstance.get(SHORT_NAME_HALEY_QUESTION)).toEqual(question.URI);
        });
    });

    describe('createAnswerInstance', () => {
        it('Should throw error if no answerInstance mapping to the answerType', () => {
            const answer = vitaljs.graphObject({ type: 'random-type', URI: 'mock:answer-uri' });
            try {
                const answerInstance = QuestionAPI.createAnswerInstance(vitaljs, answer);
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual(`No instanceType mapping for answerType: ${answer.type}`);
            }
            
        });

        it.each([
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
        ])('Should create relative answerInstance for answerType %s', (answerType, answerInstanceType) => {
            const answerURI = answerType + 'uri';
            const answer = vitaljs.graphObject({ type: answerType, URI: answerURI });
            const answerInstance = QuestionAPI.createAnswerInstance(vitaljs, answer);
            expect(answerInstance.type).toEqual(answerInstanceType);
            expect(answerInstance.get(SHORT_NAME_HALEY_ANSWER)).toEqual(answerURI);
        });
    });

    describe('createQaInstanceObjects', () => {
        it('Should throw error if no edge connected to answer object', () => {
            dataTextQuestionWithoutEdge.forEach(obj => vitaljs.graphObject(obj));
            const question = dataTextQuestionWithoutEdge.find(obj => obj.type === TYPE_HALEY_QUESTION) as any as GraphObject;
            try {
                QuestionAPI.createQaInstanceObjects(vitaljs, question, dataTextQuestionWithoutEdge as any as GraphObject[]);
            } catch(error) {
                expect(error.message).toEqual(expect.stringContaining('Question http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail does not have any connected answer object.'));
            }
        });

        it('Should throw error if multiple edge connected to multiple answerObject', () => {
            dataTextQuestionWithMultipleMatch.forEach(obj => vitaljs.graphObject(obj));
            const question = dataTextQuestionWithMultipleMatch.find(obj => obj.type === TYPE_HALEY_QUESTION) as any as GraphObject;
            try {
                QuestionAPI.createQaInstanceObjects(vitaljs, question, dataTextQuestionWithMultipleMatch as any as GraphObject[]);
            } catch(error) {
                expect(error.message).toEqual(expect.stringContaining('Question http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail have multiple answers connected.'));
            }
        });

        it('Should create instance objects', () => {
            dataTextQuestion.forEach(obj => vitaljs.graphObject(obj));
            const question = dataTextQuestion.find(obj => obj.type === TYPE_HALEY_QUESTION) as any as GraphObject;
            const answer = dataTextQuestion.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER) as any as GraphObject;
            
            const { createdInstances, questionInstance, qaObjectsLeft } = QuestionAPI.createQaInstanceObjects(vitaljs, question, dataTextQuestion as any as GraphObject[]);

            expect(createdInstances.length).toBe(3);
            const createdQuestionInstance = createdInstances.find(obj => obj.type === TYPE_HALEY_QUESTION_INSTANCE);
            const createdEdgeToAnswerInstance = createdInstances.find(obj => obj.type === EDGE_ANSWER_INSTANCE);
            const answerInstance = createdInstances.find(obj => obj.type === TYPE_HALEY_TEXT_ANSWER_INSTANCE);
            expect(createdQuestionInstance).toEqual(questionInstance);
            expect(questionInstance.get(SHORT_NAME_HALEY_QUESTION)).toEqual(question.URI);

            expect(createdEdgeToAnswerInstance.get(SHORT_NAME_EDGE_SOURCE)).toEqual(questionInstance.URI);
            expect(createdEdgeToAnswerInstance.get(SHORT_NAME_EDGE_DESTINATION)).toEqual(answerInstance.URI);

            expect(answerInstance.get(SHORT_NAME_HALEY_ANSWER)).toEqual(answer.URI);

            expect(qaObjectsLeft.length).toBe(1);
            
        });
    })
    
});

