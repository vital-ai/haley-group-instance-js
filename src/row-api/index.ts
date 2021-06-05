import { GraphObject, CreateRowInstancesResult, VitalJs } from '../util/type';
import { QuestionAPI } from '../question-api/index';
import { EDGE_ROW,
    SHORT_NAME_EDGE_DESTINATION,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_HALEY_ROW,
    TYPE_HALEY_ROW_INSTANCE,
    EDGE_QUESTION,
    EDGE_QUESTION_INSTANCE,
    EDGE_ROW_INSTANCE,
    EDGE_ANSWER_INSTANCE,
    TYPE_HALEY_ROW,
    SHORT_NAME_HALEY_ROW_TYPE_URI,
    EDGE_ANSWER,
    SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER,
    SHORT_NAME_HALEY_ANSWER,
    SHORT_NAME_HALEY_ANSWER_TYPE,
    SHORT_NAME_HALEY_SECTION,
    TYPE_HALEY_SECTION_INSTANCE,
    TYPE_HALEY_SECTION,
} from '../util/type-haley-ai-question';
import { createEdgeObject, createVitalObject, getDestinationObjects, getSourceObject } from '../util/util';
import { flatten } from 'lodash';

export class RowAPI {

    // 1 means row will not have another connected to it, 2 means it will handle row->row case, 3 means row->row->row case.
    private static maxLevel: number = 2;
    private static maximumSiblingRowInstances = 26 * 26;

    static createRowInstance(vitaljs: VitalJs, row: GraphObject, rowInstanceCounter: string='AA') {
        const obj = createVitalObject(
            vitaljs,
            TYPE_HALEY_ROW_INSTANCE,
            { [SHORT_NAME_HALEY_ROW]: row.URI, [SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER]: rowInstanceCounter }
        );
        return obj;
    }

    static getRowByRowType(qaObjects: GraphObject[], rowType: string) {
        const rows = qaObjects.filter(obj => obj.type === TYPE_HALEY_ROW && obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI) === rowType);

        if (!rows.length) {
            throw new Error(`No row found with rowType: ${rowType}`);
        }

        if (rows.length !== 1) {
            throw new Error(`Multiple rows found with rowType: ${rowType}; row uris: ${rows.map(obj => obj.URI)}`);
        }

        return rows[0];
    }

    // This will only handle the row case not the row-row case. 
    // if rowInstanceCounter provided, then there should only be one rowInstance exists that meet the criteria.
    static getRowInstanceByRowAndInstanceCounter(qaInstanceObjects: GraphObject[], row: GraphObject, rowInstanceCounter?: string): GraphObject[] {
        const rowInstances = qaInstanceObjects.filter(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && obj.get(SHORT_NAME_HALEY_ROW) === row.URI && (!rowInstanceCounter || obj.get(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER) === rowInstanceCounter));
        if (rowInstanceCounter && !rowInstances.length) {
            throw new Error(`No rowInstance found to connect row ${row.URI} with counter: ${rowInstanceCounter}`);
        }

        if (rowInstanceCounter && rowInstances.length !== 1) {
            throw new Error(`Multiple rowInstances found to connect row ${row.URI}; rowInstances uris: ${rowInstances.map(obj => obj.URI)}`);
        }
        return rowInstances;
    }

    static getSiblingRowInstances(qaInstanceObjects: GraphObject[], row: GraphObject, rowInstance: GraphObject) {
        const upperInstance = getSourceObject(qaInstanceObjects, EDGE_ROW_INSTANCE, rowInstance);
        const rowInstances = getDestinationObjects(qaInstanceObjects, EDGE_ROW_INSTANCE, upperInstance);
        const siblings = rowInstances.filter(obj => obj.get(SHORT_NAME_HALEY_ROW) === row.URI);
        return siblings;
    }

    static getInstancesUnderRowInstance(qaInstanceObjects: GraphObject[], rowInstance: GraphObject): GraphObject[] {
        let instances: GraphObject[] = [];
        const edgeToProvidedRowInstance = qaInstanceObjects.find(obj => obj.type === EDGE_ROW_INSTANCE && obj.get(SHORT_NAME_EDGE_DESTINATION) === rowInstance.URI);

        instances = [edgeToProvidedRowInstance, rowInstance];

        const questionInstances = getDestinationObjects(qaInstanceObjects, EDGE_QUESTION_INSTANCE, rowInstance);
        questionInstances.forEach(questionInstance => {
            const questionInstanceAndAnswerInstanceWithEdge = QuestionAPI.getQaInstancesWithEdges(qaInstanceObjects, questionInstance);
            instances = [...instances, ...questionInstanceAndAnswerInstanceWithEdge];
        });

        const rowRowInstances = getDestinationObjects(qaInstanceObjects, EDGE_ROW_INSTANCE, rowInstance);

        rowRowInstances.forEach(rowRowInstance => {
            const rowRowInstanceQaInstances = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowRowInstance);
            instances = [...instances, ...rowRowInstanceQaInstances];
        });

        return instances;
    }

    static createQaInstanceObjects(vitaljs: VitalJs, row: GraphObject, qaObjects: GraphObject[], rowInstanceCounter: string='AA', level: number = 1, handleRowRow: boolean = false):  CreateRowInstancesResult {

        let createdQaInstances: GraphObject[] = []

        const rowInstance = this.createRowInstance(vitaljs, row, rowInstanceCounter);
        createdQaInstances = [rowInstance, ...createdQaInstances];

        const edgeToQuestions = qaObjects.filter(obj => obj.type === EDGE_QUESTION && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
        const edgeToQuestionURIs = edgeToQuestions.map(obj => obj.URI);
        const questions = edgeToQuestions.map(edge => {
            const findQuestions = qaObjects.filter(obj => obj.URI === edge.get(SHORT_NAME_EDGE_DESTINATION));
            if (!findQuestions.length) {
                throw new Error(`Could not find the question object connected to edge ${edge.URI}, questionURI: ${edge.get(SHORT_NAME_EDGE_DESTINATION)}`);
            }

            if (findQuestions.length > 1) {
                throw new Error(`Multiple question objects connected to edge ${edge.URI}}`);
            }

            return findQuestions[0];
        });

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== row.URI && !edgeToQuestionURIs.includes(obj.URI));

        for (const question of questions) {
            const { qaObjectsLeft: questionQaObjectsLeft, createdInstances, questionInstance } = QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft);
            qaObjectsLeft = questionQaObjectsLeft;
            const edgeToQuestionInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, rowInstance, questionInstance);
            createdQaInstances = [...createdQaInstances, edgeToQuestionInstance, ...createdInstances];
        }

        if (handleRowRow && level <= RowAPI.maxLevel) {
            const edgeToRows = qaObjects.filter(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
            const edgeToRowURIs = edgeToRows.map(obj => obj.URI);
            const rows = edgeToRows.map(edge => {
                const rowURI = edge.get(SHORT_NAME_EDGE_DESTINATION);
                const findRows = qaObjects.filter(obj => obj.URI === rowURI);
                if (!findRows.length) {
                    throw new Error(`Could not find the row object connected to edge ${edge.URI}, rowURI ${rowURI}`);
                }
                if (findRows.length > 1) {
                    throw new Error(`Multiple row objects connected to edge ${edge.URI}}`);
                }
                return findRows[0];
            });

            qaObjectsLeft = qaObjectsLeft.filter(obj => !edgeToRowURIs.includes(obj.URI));

            for (const row of rows) {
                const { qaObjectsLeft: rowQaObjectsLeft, createdInstances, rowInstance: secondLevelRowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, undefined, level + 1);
                qaObjectsLeft = rowQaObjectsLeft;
                const edgeToRowInstance = createEdgeObject(vitaljs, EDGE_ROW_INSTANCE, rowInstance, secondLevelRowInstance);
                createdQaInstances = [...createdQaInstances, edgeToRowInstance, ...createdInstances];
            }
        }

        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            rowInstance: rowInstance,
        };
    }

    static createQaRowInstanceObjectsWithUpperEdge(vitaljs: VitalJs, row: GraphObject, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string = 'AA', providedUpperInstance?: GraphObject, providedLevel?: number, option: any = {}):  GraphObject[] {

        let upperInstance: GraphObject;
        let level: number;

        if (!providedUpperInstance) {
            const edgeToProvideRow = qaObjects.find(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_DESTINATION) === row.URI);

            if (!edgeToProvideRow) {
                throw new Error('Could not find any edges that pointed to the provided row');
            }

            const rowOrSection = qaObjects.find(obj => obj.URI === edgeToProvideRow.get(SHORT_NAME_EDGE_SOURCE));
        
            if (!rowOrSection) {
                throw new Error(`Could not find the upper object that pointed to the provided row. upper object URI: ${edgeToProvideRow.get(SHORT_NAME_EDGE_SOURCE)}`)
            }

            const shortNameToMatchUpperObject = rowOrSection.type === TYPE_HALEY_ROW ? SHORT_NAME_HALEY_ROW : SHORT_NAME_HALEY_SECTION;
            const upperInstanceType = rowOrSection.type === TYPE_HALEY_ROW ? TYPE_HALEY_ROW_INSTANCE : TYPE_HALEY_SECTION_INSTANCE;
            upperInstance = qaInstanceObjects.find(obj => obj.type === upperInstanceType && obj.get(shortNameToMatchUpperObject) === rowOrSection.URI);
            level = rowOrSection.type === TYPE_HALEY_ROW ? 2 : 1;
        } else {
            upperInstance = providedUpperInstance;
            level = providedLevel;
        }

        if (!upperInstance) {
            throw new Error(`Could not find the upper instance object.`);
        }

        const { createdInstances, rowInstance: createdRowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjects, rowInstanceCounter, level, option.handleRowRow);

        const edgeToRowInstance = createEdgeObject(vitaljs, EDGE_ROW_INSTANCE, upperInstance, createdRowInstance);

        return [edgeToRowInstance, ...createdInstances];
    
    }

    static getRowAndRowInstancePair(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string): [GraphObject, GraphObject] {

        const row = RowAPI.getRowByRowType(qaObjects, rowType);
        const rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];

        return [row, rowInstance];
    }

    static getRowRowPairUnderRowPair(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], row: GraphObject, rowInstance: GraphObject, rowRowInstanceCounter: string, rowRowType: string) {
        const edgeToRows = qaObjects.filter(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
        const rowRowURIs = edgeToRows.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));

        // 1 get row based on rowRowType
        const rowRows = qaObjects.filter(obj => {
            return obj.type === TYPE_HALEY_ROW && rowRowURIs.includes(obj.URI) && obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI) === rowRowType
        });

        if (!rowRows.length) {
            throw new Error(`No row found with rowRowType: ${rowRowType} under row (${row.URI})`);
        }

        if (rowRows.length !== 1) {
            throw new Error(`Multiple rowRows found with rowRowType: ${rowRowType}; row uris: ${rowRows.map(obj => obj.URI)}`);
        }

        const rowRow = rowRows[0];

        // 3 get rowInstance based on rowInstanceCounter
        const edgeFromRowInstanceToRowRowInstances = qaInstanceObjects.filter(obj => obj.type === EDGE_ROW_INSTANCE && obj.get(SHORT_NAME_EDGE_SOURCE) === rowInstance.URI);
        const rowRowInstanceUnderProvidedRowInstanceURIs = edgeFromRowInstanceToRowRowInstances.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION));
        const rowRowInstancesUnderProvidedRowInstance = qaInstanceObjects.filter(obj => obj.type === TYPE_HALEY_ROW_INSTANCE && rowRowInstanceUnderProvidedRowInstanceURIs.includes(obj.URI));
        const rowRowInstances = rowRowInstancesUnderProvidedRowInstance.filter(obj => obj.get(SHORT_NAME_HALEY_ROW) === rowRow.URI && obj.get(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER) === rowRowInstanceCounter);
        if (!rowRowInstances.length) {
            throw new Error(`No rowInstance found to connect row ${rowRow.URI} with counter: ${rowRowInstanceCounter}`);
        }

        if (rowRowInstances.length !== 1) {
            throw new Error(`Multiple rowInstances found to connect row ${rowRow.URI}; rowInstances uris: ${rowRowInstances.map(obj => obj.URI)}`);
        }
        const rowRowInstance = rowRowInstances[0];
        // const rowRowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaObjects, qaInstanceObjects, rowRow, rowRowInstanceCounter);

        return [rowRow, rowRowInstance];
    }

    static getAnswerPairByAnswerTypeUnderRowPair(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], row: GraphObject, rowInstance: GraphObject, answerType: string) {
        // 2 get answerObject based on answerType and row;
        const edgeFromRowToQuestions = qaObjects.filter(obj => obj.type === EDGE_QUESTION && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
        const questionURIs: string[] = edgeFromRowToQuestions.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const edgeFromRowToAnswers = qaObjects.filter(obj => obj.type === EDGE_ANSWER && questionURIs.includes(obj.get(SHORT_NAME_EDGE_SOURCE)));
        const answerURIs: string[] = edgeFromRowToAnswers.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const answers = qaObjects.filter(obj => answerURIs.includes(obj.URI) && obj.get(SHORT_NAME_HALEY_ANSWER_TYPE) === answerType);

        const rowType = row.get(SHORT_NAME_HALEY_ROW_TYPE_URI);

        if (!answers.length) {
            throw new Error(`No answer object found with answerType: ${rowType} under rowType: ${rowType}. Any of the following could be missing: edgeFromRowToQuestionObject, EdgeFromQuestionToAnswer, AnswerObject.`);
        }

        if (answers.length !== 1) {
            throw new Error(`Multiple answers found with answerType: ${rowType}; answer uris: ${answers.map(obj => obj.URI)}`);
        }
        const answer = answers[0];

        // 4 get answerInstance based on answerObject and rowInstance
        const edgeFromRowToQuestionInstances = qaInstanceObjects.filter(obj => obj.type === EDGE_QUESTION_INSTANCE && obj.get(SHORT_NAME_EDGE_SOURCE) === rowInstance.URI);
        const questionInstanceURIs: string[] = edgeFromRowToQuestionInstances.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const edgeToAnswerInstances = qaInstanceObjects.filter(obj => obj.type === EDGE_ANSWER_INSTANCE && questionInstanceURIs.includes(obj.get(SHORT_NAME_EDGE_SOURCE) ?? ''));
        const answerInstanceURIs: string[] = edgeToAnswerInstances.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const answerInstances = qaInstanceObjects.filter(obj => answerInstanceURIs.includes(obj.URI) && obj.get(SHORT_NAME_HALEY_ANSWER) === answer.URI);

        if (!answerInstances.length) {
            throw new Error(`No matched answerInstance object found.`);
        }

        if (answerInstances.length !== 1) {
            throw new Error(`Multiple matched answerInstances found. answerInstance uris: ${answerInstances.map(obj => obj.URI)}`);
        }

        const answerInstance = answerInstances[0];

        return [answer, answerInstance];

    }

    static getAnswerPairByAnswerTypeInsideRow(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, answerType: string) {
        // 1 get row and rowInstance
        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);
        const [answer, answerInstance] = RowAPI.getAnswerPairByAnswerTypeUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, answerType);
        
        return [answer, answerInstance];
    }

    // given row counter, row type, row-row counter, row-row-type, and answer type, get value, if any.
    static getAnswerPairByAnswerTypeInsideRowRow(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowInstanceCounter: string, rowType: string, rowRowInstanceCounter: string, rowRowType: string, answerType: string) {
        // 1 get row and rowInstance
        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);
        const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType);
        const [answer, answerInstance] = RowAPI.getAnswerPairByAnswerTypeUnderRowPair(qaObjects, qaInstanceObjects, rowRow, rowRowInstance, answerType);
        
        return [answer, answerInstance];
    }

    static getRowInstanceCountersByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string): string[] {
        const row = RowAPI.getRowByRowType(qaObjects, rowType);
        const rowInstances = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row);
        return rowInstances.map(ins => ins.get(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER));
    }

    static updateRowInstanceCounterByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, counter: string): GraphObject {
        const counters = RowAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowType);

        if (counters.includes(counter)) {
            throw new Error(`The rowInstance with counter as ${counter} is already exists`);
        }

        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);

        rowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, counter);
        
        return rowInstance;
    }

    static getRowRowInstanceCountersByRowRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string): string[] {
        const row = RowAPI.getRowByRowType(qaObjects, rowType);
        const rowRow = RowAPI.getRowByRowType(qaObjects, rowRowType);
        const rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];
        const rowRowInstances = getDestinationObjects(qaInstanceObjects, EDGE_ROW_INSTANCE, rowInstance);
        const rowInstancesConnectedToRowRow = RowAPI.getRowInstanceByRowAndInstanceCounter(rowRowInstances, rowRow);
        return rowInstancesConnectedToRowRow.map(ins => ins.get(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER));
    }

    static updateRowRowInstanceCountersByRowRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter: string, counter: string): GraphObject {
        const rowRowInstanceCounters = RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);

        if (rowRowInstanceCounters.includes(counter)) {
            throw new Error(`The rowInstance with counter as ${counter} is already exists`);
        }

        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);
        const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType);

        rowRowInstance.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, counter);
        
        return rowRowInstance;
    }

    // handleRowRow set to true will create rowRowInstance within the result.
    static createRowQaInstancesByRowType(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter?: string, handleRowRow: boolean = false): GraphObject[] {
        const row = RowAPI.getRowByRowType(qaObjects, rowType);
        const rowInstances = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row);
        const rowInstanceCounters = rowInstances.map(obj => obj.get(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER));
        
        if (rowInstanceCounter) {
            if (rowInstanceCounters.includes(rowInstanceCounter)) {
                throw new Error(`The generated rowInstanceCounters has already existed, existing rowInstanceCounters: ${rowInstanceCounters}. The rowInstanceCounter provided: ${rowInstanceCounter}`);
            }
            return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, row, qaObjects, qaInstanceObjects, rowInstanceCounter, undefined, undefined, { handleRowRow });
        }
        
        const generatedRowInstanceCounter = RowAPI.generateRowInstanceCounter(rowInstances.length);

        if (rowInstanceCounters.includes(generatedRowInstanceCounter)) {
            throw new Error(`The generated rowInstanceCounters has already existed, existing rowInstanceCounters: ${rowInstanceCounters}. The generated rowInstanceCounter: ${generatedRowInstanceCounter}`);
        }

        return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, row, qaObjects, qaInstanceObjects, generatedRowInstanceCounter, undefined, undefined, { handleRowRow });

    }

    static removeRowQaInstancesByRowType(qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string): GraphObject[] {
        const row = RowAPI.getRowByRowType(qaObjects, rowType);
        const rowInstance = RowAPI.getRowInstanceByRowAndInstanceCounter(qaInstanceObjects, row, rowInstanceCounter)[0];
        // const siblingRowInstances = RowAPI.getSiblingRowInstances(qaInstanceObjects, row, rowInstance).filter(instance => instance.URI !== rowInstance.URI);
        
        const instancesUnderRowInstanceWithUpperEdge = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowInstance);

        const objToBeRemoveURIs = new Set(instancesUnderRowInstanceWithUpperEdge.map(obj => obj.URI));
        const instancesLeft = qaInstanceObjects.filter(obj => !objToBeRemoveURIs.has(obj.URI));

        // siblingRowInstances.forEach((ins, index) => {
        //     ins.set(SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER, RowAPI.generateRowInstanceCounter(index));
        // });

        return instancesLeft;
    }

    static createRowRowQaInstancesByRowType(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter?: string): GraphObject[] {
        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);
        const rowRow = RowAPI.getRowByRowType(qaObjects, rowRowType);
        const rowRowInstanceCounters = RowAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowType, rowInstanceCounter, rowRowType);
        if (rowRowInstanceCounter && rowRowInstanceCounters.includes(rowRowInstanceCounter)) {
            throw new Error(`RowInstance with counter ${rowRowInstanceCounter} already exist`);
        } 

        if (rowRowInstanceCounter) {
            return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, rowRow, qaObjects, qaInstanceObjects, rowRowInstanceCounter, rowInstance, 2);
        }

        let generatedCounter: string;
        let index = rowRowInstanceCounters.length;

        while(!generatedCounter) {
            const counter = this.generateRowInstanceCounter(index);
            if (rowRowInstanceCounters.includes(counter)) {
                index += 1;
            } else {
                generatedCounter = counter;
            }
        }

        return RowAPI.createQaRowInstanceObjectsWithUpperEdge(vitaljs, rowRow, qaObjects, qaInstanceObjects, generatedCounter, rowInstance, 2);
        
    }

    static removeRowRowQaInstancesByRowType(vitaljs: VitalJs, qaObjects: GraphObject[], qaInstanceObjects: GraphObject[], rowType: string, rowInstanceCounter: string, rowRowType: string, rowRowInstanceCounter?: string): GraphObject[] {
        const [row, rowInstance] = RowAPI.getRowAndRowInstancePair(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType);
        const [rowRow, rowRowInstance] = RowAPI.getRowRowPairUnderRowPair(qaObjects, qaInstanceObjects, row, rowInstance, rowRowInstanceCounter, rowRowType);

        const instancesUnderRowInstanceWithUpperEdge = RowAPI.getInstancesUnderRowInstance(qaInstanceObjects, rowRowInstance);

        const objToBeRemoveURIs = new Set(instancesUnderRowInstanceWithUpperEdge.map(obj => obj.URI));
        const instancesLeft = qaInstanceObjects.filter(obj => !objToBeRemoveURIs.has(obj.URI));

        return instancesLeft;
    }

    static getFirstLevelRows(qaObjects: GraphObject[]): GraphObject[] {
        const sections = qaObjects.filter(obj => obj.type === TYPE_HALEY_SECTION);
        const rows = flatten(sections.map(section => getDestinationObjects(qaObjects, EDGE_ROW, section)));
        return rows;
    }

    static getRowTypes(qaObjects: GraphObject[]): string[] {
        const rows = RowAPI.getFirstLevelRows(qaObjects);
        return rows.map(obj => obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI));
    }

    static getRowTypesInRow(qaObjects: GraphObject[], rowType: string) {
        const rows = RowAPI.getFirstLevelRows(qaObjects);
        const row = rows.find(obj => obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI) === rowType);
        if (!row) {
            throw new Error(`Couldn't find any row with rowType: ${rowType}`);
        }

        const rowRows = getDestinationObjects(qaObjects, EDGE_ROW, row);

        return rowRows.map(obj => obj.get(SHORT_NAME_HALEY_ROW_TYPE_URI));

    }

    static generateRowInstanceCounter(index: number) {

        if (index > 26 * 26) {
            throw new Error(`The max rowInstance for a row is ${26 * 26}. The request number is ${index}`);
        }
        const indexToCapitalCharacter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        const div = Math.floor(index / 26);
        const mod = index % 26;

        return indexToCapitalCharacter[div] + indexToCapitalCharacter[mod];
    }

    static counterToNumber(counter: string) {
        const character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const max = RowAPI.maximumSiblingRowInstances + 2;
        if (!counter) return max;
        if (counter.length === 1) {
            if (!character.includes(counter)) return max;
            return character.indexOf(counter);
        }

        if (counter.length === 2) {
            if (!character.includes(counter[0]) || !character.includes(counter[1])) return max;
            return character.indexOf(counter[0]) * 26 + character.indexOf(counter[1]);
        }

        return max;
    }

    static compareRowInstanceCounter(counter1: string, counter2: string) {
        return RowAPI.counterToNumber(counter1) - RowAPI.counterToNumber(counter2)
    }

}