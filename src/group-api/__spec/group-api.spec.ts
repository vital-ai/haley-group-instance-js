import { GroupAPI } from '../group-api';
import { GraphObject } from '../../util/type';
import { data } from './mock.data';

const { vitaljs } = require('../../../test-util');

describe('GroupAPI', () => {

    let qaObjects: GraphObject[] = [];
    let qaInstanceObjects: GraphObject[] = [];
    let answerType = '';

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
            new GroupAPI(vitaljs);
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
    
});

