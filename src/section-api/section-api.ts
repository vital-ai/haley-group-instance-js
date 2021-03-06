import { GraphObject, CreateSectionInstancesResult, VitalJs } from '../util/type';
import { QuestionAPI } from '../question-api/index';
import { RowAPI } from '../row-api/index';
import { EDGE_ROW,
    SHORT_NAME_EDGE_DESTINATION,
    SHORT_NAME_EDGE_SOURCE,
    EDGE_QUESTION,
    EDGE_QUESTION_INSTANCE,
    EDGE_ROW_INSTANCE,
    TYPE_HALEY_SECTION_INSTANCE,
    SHORT_NAME_HALEY_SECTION
} from '../util/constant';
import { createEdgeObject, createVitalObject } from '../util/util';

export class SectionAPI {

    static createQaInstanceObjects(vitaljs: VitalJs, section: GraphObject, qaObjects: GraphObject[]):  CreateSectionInstancesResult {

        let createdQaInstances: GraphObject[] = []

        const sectionInstance = this.createSectionInstance(vitaljs, section);
        createdQaInstances = [sectionInstance, ...createdQaInstances];

        const edgeToQuestions = qaObjects.filter(obj => obj.type === EDGE_QUESTION && obj.get(SHORT_NAME_EDGE_SOURCE) === section.URI);
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

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== section.URI && !edgeToQuestionURIs.includes(obj.URI));

        for (const question of questions) {
            const { qaObjectsLeft: questionQaObjectsLeft, createdInstances, questionInstance } = QuestionAPI.createQaInstanceObjects(vitaljs, question, qaObjectsLeft);
            qaObjectsLeft = questionQaObjectsLeft;
            const edgeToQuestionInstance = createEdgeObject(vitaljs, EDGE_QUESTION_INSTANCE, sectionInstance, questionInstance);
            createdQaInstances = [...createdQaInstances, edgeToQuestionInstance, ...createdInstances];
        }

        const edgeToRows = qaObjects.filter(obj => obj.type === EDGE_ROW && obj.get(SHORT_NAME_EDGE_SOURCE) === section.URI);
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
            const { qaObjectsLeft: rowQaObjectsLeft, createdInstances, rowInstance } = RowAPI.createQaInstanceObjects(vitaljs, row, qaObjectsLeft, 1);
            qaObjectsLeft = rowQaObjectsLeft;
            const edgeToRowInstance = createEdgeObject(vitaljs, EDGE_ROW_INSTANCE, sectionInstance, rowInstance);
            createdQaInstances = [...createdQaInstances, edgeToRowInstance, ...createdInstances];
        }

        return {
            createdInstances: createdQaInstances,
            qaObjectsLeft: qaObjectsLeft,
            sectionInstance: sectionInstance,
        };
    }

    static createSectionInstance(vitaljs: VitalJs, section: GraphObject) {
        const obj = createVitalObject(vitaljs, TYPE_HALEY_SECTION_INSTANCE);
        obj.set(SHORT_NAME_HALEY_SECTION, section.URI);
        return obj;
    }
}
