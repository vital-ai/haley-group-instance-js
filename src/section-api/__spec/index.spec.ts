import { SectionAPI } from '../section-api';
import { GraphObject } from '../../util/type';
import { redundantObject, rootAnswer1, rootQuestion1, rootRow } from './mock.data';
import {
    dataTestSectionMissingQuestion,
    dataTestSection,
    dataTestSectionMissingRow,
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
    TYPE_HALEY_SECTION,
    TYPE_HALEY_SECTION_INSTANCE,
    SHORT_NAME_HALEY_SECTION,
} from '../../util/type-haley-ai-question';

const { vitaljs } = require('../../../test-util');

describe('SectionAPI', () => {

    describe('createSectionInstance', () => {
        it('Should create sectionInstance', () => {
            const section = vitaljs.graphObject({ type: TYPE_HALEY_SECTION, URI: 'mock:section-uri' });
            const sectionInstance = SectionAPI.createSectionInstance(vitaljs, section);
            expect(sectionInstance.type).toBe(TYPE_HALEY_SECTION_INSTANCE);
            expect(sectionInstance.get(SHORT_NAME_HALEY_SECTION)).toEqual(section.URI);
        });
    });

    describe('createQaInstanceObjects', () => {
        it('Should throw error if no question found to connected to the edge_hasHaleyQuestion', () => {
           dataTestSectionMissingQuestion.forEach(obj => vitaljs.graphObject(obj));
            const section = dataTestSectionMissingQuestion.find(obj => obj.type === TYPE_HALEY_SECTION) as any as GraphObject;
            try {
                SectionAPI.createQaInstanceObjects(vitaljs, section, dataTestSectionMissingQuestion as any as GraphObject[]);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Could not find the question object connected to edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728, questionURI: http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber');
            }
        });

        it('Should throw error if no row found to connected to edge_hasHaleyRow', () => {
            dataTestSectionMissingRow.forEach(obj => vitaljs.graphObject(obj));
            const section = dataTestSectionMissingRow.find(obj => obj.type === TYPE_HALEY_SECTION) as any as GraphObject;
            try {
                SectionAPI.createQaInstanceObjects(vitaljs, section, dataTestSectionMissingRow as any as GraphObject[], true);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.message).toEqual('Could not find the row object connected to edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023, rowURI http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row');
            }
        });

        it('Should create instance objects', () => {
            dataTestSection.forEach(obj => vitaljs.graphObject(obj));
            const section = dataTestSection.find(obj => obj.type === TYPE_HALEY_SECTION) as any as GraphObject;
            const { createdInstances, qaObjectsLeft, sectionInstance } = SectionAPI.createQaInstanceObjects(vitaljs, section, dataTestSection as any as GraphObject[], true);
            expect(sectionInstance.get(SHORT_NAME_HALEY_SECTION)).toBe(section.URI);
            expect(createdInstances.length).toBe(17);

            const sectionInstances = createdInstances.filter(ins => ins.type === TYPE_HALEY_SECTION_INSTANCE && ins.get(SHORT_NAME_HALEY_SECTION) === section.URI);
            expect(sectionInstances).toEqual([sectionInstance]);

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

            expect(qaObjectsLeft).toEqual([redundantObject]);

        });
    })
    
});

