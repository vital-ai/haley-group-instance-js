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
} from '../util/constant';
import { createEdgeObject, createVitalObject } from '../util/util';


export class RowAPI {

    // 1 means row will not have another connected to it, 2 means it will handle row->row case, 3 means row->row->row case.
    private static maxLevel: number = 2;

    static createRowInstance(vitaljs: VitalJs, row: GraphObject) {
        const obj = createVitalObject(vitaljs, TYPE_HALEY_ROW_INSTANCE);
        obj.set(SHORT_NAME_HALEY_ROW, row.URI);
        return obj;
    }

    static createQaInstanceObjects(vitaljs: VitalJs, row: GraphObject, qaObjects: GraphObject[], level: number = 1):  CreateRowInstancesResult {

        let createdQaInstances: GraphObject[] = []

        const rowInstance = this.createRowInstance(vitaljs, row);
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

        if (level <= RowAPI.maxLevel) {
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
                const { qaObjectsLeft: rowQaObjectsLeft, createdInstances, rowInstance: secondLevelRowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, level + 1);
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

}