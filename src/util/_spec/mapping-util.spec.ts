import { cloneDeep } from "lodash";
import { vitaljs } from "../../../test-util";
import { GraphObject } from '../type';
import {
    dataLackOfSectionObject,
    dataLackOfRowObject,
    dataTestGroup,
    dataLackOfQuestionObject1,
    dataLackOfQuestionObject2,
    dataLackOfEdgeToAnswerObject,
    dataLackOfAnswerObject
} from './mock.data';
import {
    dataLackOfSectionInstanceObject,
    dataLackOfRowInstanceObject,
    dataTestGroupInstance,
    dataLackOfQuestionInstanceObject1,
    dataLackOfQuestionInstanceObject2,
    dataLackOfEdgeToAnswerInstanceObject,
    dataLackOfAnswerInstanceObject
} from './mock-instance.data';
import { MappingUtil } from '../mapping-util';
import { createVitalObject } from "../util";
import { TYPE_SUBMISSION, TYPE_SUBMISSION_INQUIRY } from '../type-harbor-domains';

describe('MappingUtil', () => {

    describe('mapGroupGraph', () => {
        it('Should detect data that is complete', () => {
            const testData = cloneDeep(dataTestGroup);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(true);
        });
    
        it('Should detect data miss a section object', () => {
            const testData = cloneDeep(dataLackOfSectionObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find section object http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345']);
        });
    
        it('Should detect data miss a row object', () => {
            const testData = cloneDeep(dataLackOfRowObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find object http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023']);
        });
    
        it('Should detect data miss a question object, question under section', () => {
            const testData = cloneDeep(dataLackOfQuestionObject1);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the question object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728']);
        });
    
        it('Should detect data miss a question object, question under row', () => {
            const testData = cloneDeep(dataLackOfQuestionObject2);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the question object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293']);
        });
    
        it('Should detect data miss a edge_hasAnswer object', () => {
            const testData = cloneDeep(dataLackOfEdgeToAnswerObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find any edge from question http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber to answer.']);
        });
    
        it('Should detect data miss a answer object', () => {
            const testData = cloneDeep(dataLackOfAnswerObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the answer object http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730']);
        });
    });

    describe('mapGroupInstanceGraph', () => {
        it('Should detect data that is complete', () => {
            const testData = cloneDeep(dataTestGroupInstance);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(true);
        });
    
        it('Should detect data miss a sectionInstance object', () => {
            const testData = cloneDeep(dataLackOfSectionInstanceObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find sectionInstance object http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345']);
        });
    
        it('Should detect data miss a rowInstance object', () => {
            const testData = cloneDeep(dataLackOfRowInstanceObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find object http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023']);
        });
    
        it('Should detect data miss a questionInstance object, questionInstance under sectionInstance', () => {
            const testData = cloneDeep(dataLackOfQuestionInstanceObject1);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the questionInstance object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728']);
        });
    
        it('Should detect data miss a questionInstance object, question under rowInstance', () => {
            const testData = cloneDeep(dataLackOfQuestionInstanceObject2);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the questionInstance object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293']);
        });
    
        it('Should detect data miss a edge_hasAnswerInstance object', () => {
            const testData = cloneDeep(dataLackOfEdgeToAnswerInstanceObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find any edge from questionInstance http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber to answer.']);
        });
    
        it('Should detect data miss a answerInstance object', () => {
            const testData = cloneDeep(dataLackOfAnswerInstanceObject);
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(false)
            expect(mappingUtil.incompleteMessages).toEqual(['Could not find the answerInstance object http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730']);
        });
    });

    describe('map non-graph objects', () => {
        it('Should map complete to be true', () => {
            const testData = [createVitalObject(vitaljs, TYPE_SUBMISSION), createVitalObject(vitaljs, TYPE_SUBMISSION_INQUIRY)];
            testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));
    
            const mappingUtil = new MappingUtil(testData);
    
            expect(mappingUtil.isComplete).toBe(true);
        });
    });
});
