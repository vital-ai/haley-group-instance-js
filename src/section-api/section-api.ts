import { GraphObject, CreateSectionInstancesResult, VitalJs } from '../util/type';
import { QuestionAPI } from '../question-api/index';
import { RowAPI } from '../row-api/index';
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

export class SectionAPI {

    static createQaInstanceObjects(vitaljs: VitalJs, section: GraphObject, qaObjects: GraphObject[]):  CreateSectionInstancesResult {

        let createdQaInstances: GraphObject[] = []

        const sectionInstance = this.createSectionInstance(vitaljs, section);
        createdQaInstances = [sectionInstance, ...createdQaInstances];

        const edgeToQuestions = qaObjects.filter(obj => obj.type === EDGE_QUESTION && obj.get(SHORT_NAME_EDGE_SOURCE) === section.URI);
        const edgeToQuestionURIs = edgeToQuestions.map(obj => obj.URI);
        const questionURIs = edgeToQuestions.map(obj => obj.get(SHORT_NAME_EDGE_DESTINATION));
        const questions = qaObjects.filter(obj => obj.type === TYPE_HALEY_QUESTION && questionURIs.includes(obj.URI));

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== section.URI || edgeToQuestionURIs.includes(obj.URI));

        for (const question of questions) {
            const { qaObjectsLeft: questionQaObjectsLeft, createdInstances, questionInstance } = QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft);
            qaObjectsLeft = questionQaObjectsLeft;
            const edgeToQuestionInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, sectionInstance, questionInstance);
            createdQaInstances = [...createdQaInstances, edgeToQuestionInstance, ...createdInstances];
        }

        const edgeToRows = qaObjects.filter(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_SOURCE) === section.URI);
        const edgeToRowURIs = edgeToRows.map(obj => obj.URI);
        const rowURIs = edgeToRows.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION));
        const rows = qaObjects.filter(obj => obj.type === TYPE_HALEY_ROW && rowURIs.includes(obj.URI));

        qaObjectsLeft = qaObjectsLeft.filter(obj => edgeToRowURIs.includes(obj.URI));

        for (const row of rows) {
            const { qaObjectsLeft: rowQaObjectsLeft, createdInstances, rowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, 1);
            qaObjectsLeft = rowQaObjectsLeft;
            const edgeToRowInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, sectionInstance, rowInstance);
            createdQaInstances = [...createdQaInstances, edgeToRowInstance, ...createdInstances];
        }

        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            sectionInstance: sectionInstance,
        };
    }

    static createSectionInstance(vitaljs: VitalJs, group: GraphObject) {
        const obj = createVitalObject(vitaljs, TYPE_HALEY_ROW_INSTANCE);
        obj.set(SHORT_NAME_HALEY_ROW, group.URI);
        return obj;
    }


}