import { cloneDeep } from "lodash";
import { vitaljs } from "../../../test-util";
import { GraphObject } from '../type';
import { dataLackOfSectionObject, dataLackOfRowObject, dataTestGroup, dataLackOfQuestionObject1, dataLackOfQuestionObject2 } from './mock.data';
import { MappingUtil } from '../mapping-util';


describe('MappingUtil', () => {

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
        expect(mappingUtil.inCompleteMessages).toEqual(['Could not find section object http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345']);
    });

    it('Should detect data miss a row object', () => {
        const testData = cloneDeep(dataLackOfRowObject);
        testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));

        const mappingUtil = new MappingUtil(testData);

        expect(mappingUtil.isComplete).toBe(false)
        expect(mappingUtil.inCompleteMessages).toEqual(['Could not find object http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row, which is the destination object of Edge http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023']);
    });

    it('Should detect data miss a question object, question under section', () => {
        const testData = cloneDeep(dataLackOfQuestionObject1);
        testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));

        const mappingUtil = new MappingUtil(testData);

        expect(mappingUtil.isComplete).toBe(false)
        expect(mappingUtil.inCompleteMessages).toEqual(['Could not find the question object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728']);
    });

    it('Should detect data miss a question object, question under row', () => {
        const testData = cloneDeep(dataLackOfQuestionObject2);
        testData.forEach((obj: GraphObject) => vitaljs.graphObject(obj));

        const mappingUtil = new MappingUtil(testData);

        expect(mappingUtil.isComplete).toBe(false)
        expect(mappingUtil.inCompleteMessages).toEqual(['Could not find the question object URI=http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail, which is the destination of edge http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293']);
    });

});