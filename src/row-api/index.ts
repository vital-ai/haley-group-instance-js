import { GraphObject, CreateRowInstancesResult, VitalJs } from '../group-api/type';
import { QuestionAPI } from '../question-api/index';
import { EDGE_ROW,
    SHORT_NAME_EDGE_DESTINATION,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_HALEY_ROW,
    TYPE_HALEY_ROW_INSTANCE,
    EDGE_QUESTION,
    TYPE_HALEY_QUESTION,
    EDGE_QUESTION_INSTANCE,
    TYPE_HALEY_ROW
} from '../util/constant';
import { createEdgeObject, createVitalObject } from '../util/util';


export class RowAPI {

    static readonly maxLevel: number = 2;

    static createQaInstanceObjects(vitaljs: VitalJs, row: GraphObject, qaObjects: GraphObject[], level: number = 1):  CreateRowInstancesResult {

        let createdQaInstances: GraphObject[] = []

        const rowInstance = this.createRowInstance(vitaljs, row);
        createdQaInstances = [rowInstance, ...createdQaInstances];

        const edgeToQuestions = qaObjects.filter(obj => obj.type === EDGE_QUESTION && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
        const edgeToQuestionURIs = edgeToQuestions.map(obj => obj.URI);
        const questionURIs = edgeToQuestions.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const questions = qaObjects.filter(obj => obj.type === TYPE_HALEY_QUESTION && questionURIs.includes(obj.URI));

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== row.URI || edgeToQuestionURIs.includes(obj.URI));

        for (const question of questions) {
            const { qaObjectsLeft: questionQaObjectsLeft, createdInstances, questionInstance } = QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft);
            qaObjectsLeft = questionQaObjectsLeft;
            const edgeToQuestionInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, rowInstance, questionInstance);
            createdQaInstances = [...createdQaInstances, edgeToQuestionInstance, ...createdInstances];
        }

        if (level <= RowAPI.maxLevel) {
            const edgeToRows = qaObjects.filter(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_SOURCE) === row.URI);
            const edgeToRowURIs = edgeToRows.map(obj => obj.URI);
            const rowURIs = edgeToRows.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION));
            const rows = qaObjects.filter(obj => obj.type === TYPE_HALEY_ROW && rowURIs.includes(obj.URI));

            qaObjectsLeft = qaObjectsLeft.filter(obj => edgeToRowURIs.includes(obj.URI));

            for (const row of rows) {
                const { qaObjectsLeft: rowQaObjectsLeft, createdInstances, rowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, level + 1);
                qaObjectsLeft = rowQaObjectsLeft;
                const edgeToRowInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, rowInstance, rowInstance);
                createdQaInstances = [...createdQaInstances, edgeToRowInstance, ...createdInstances];
            }
        }

        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            rowInstance: rowInstance,
        };
    }

    static createRowInstance(vitaljs: VitalJs, row: GraphObject) {
        const obj = createVitalObject(vitaljs, TYPE_HALEY_ROW_INSTANCE);
        obj.set(SHORT_NAME_HALEY_ROW, row.URI);
        return obj;
    }
}