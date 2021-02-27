import { GroupAPI } from '../group-api';
import { GraphObject } from '../type';

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
    
});

