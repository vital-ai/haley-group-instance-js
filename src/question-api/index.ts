import { CreateQuestionInstancesResult, GraphObject, VitalJs } from '../util/type';
import { createVitalObject, createEdgeObject } from '../util/util';
import { SHORT_NAME_HALEY_ANSWER,
    SHORT_NAME_HALEY_QUESTION,
    TYPE_HALEY_QUESTION_INSTANCE,
    EDGE_ANSWER,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_EDGE_DESTINATION,
    EDGE_ANSWER_INSTANCE,
    MAPPING_ANSWER_TO_ANSWER_INSTANCE
} from '../util/constant';


export class QuestionAPI {

    static createQuestionInstance(vitaljs: VitalJs, question: GraphObject) {
        const obj = createVitalObject(vitaljs, TYPE_HALEY_QUESTION_INSTANCE);
        obj.set(SHORT_NAME_HALEY_QUESTION, question.URI);
        return obj;
    }

    static createAnswerInstance(vitaljs: VitalJs, answer: GraphObject) {
        const instanceType = MAPPING_ANSWER_TO_ANSWER_INSTANCE.get(answer.type);
        if (!instanceType) {
            throw new Error(`No instanceType mapping for answerType: ${answer.type}`);
        }
        const obj = createVitalObject(vitaljs, instanceType);
        obj.set(SHORT_NAME_HALEY_ANSWER, answer.URI);
        return obj;
    }

    static createQaInstanceObjects(vitaljs: VitalJs, question: GraphObject, qaObjects: GraphObject[]):  CreateQuestionInstancesResult {

        const questionInstance = QuestionAPI.createQuestionInstance(vitaljs, question);
        const edgeToAnswers = qaObjects.filter(obj => obj.type === EDGE_ANSWER && obj.get(SHORT_NAME_EDGE_SOURCE) === question.URI);
        const edgeToAnswerURIs = edgeToAnswers.map(obj => obj.URI);
        const answerURIs = edgeToAnswers.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION));
        const answers = qaObjects.filter(obj => answerURIs.includes(obj.URI));

        if (edgeToAnswers.length === 0 || answers.length === 0) {
            throw new Error(`Question ${question.URI} does not have any connected answer object. EdgeToAnswer=${edgeToAnswers}, answer=${answers}`);
        }

        if (edgeToAnswers.length !== 1 || answers.length !== 1) {
            throw new Error(`Question ${question.URI} have multiple answers connected. EdgeToAnswer=${edgeToAnswers}, answer=${answers}`);
        }

        let qaObjectsLeft: GraphObject[] = qaObjects.filter(obj => obj.URI !== question.URI && !edgeToAnswerURIs.includes(obj.URI) && !answerURIs.includes(obj.URI));

        const answerInstance = QuestionAPI.createAnswerInstance(vitaljs, answers[0]);
        const edgeToAnswerInstance = createEdgeObject(vitaljs, EDGE_ANSWER_INSTANCE, questionInstance, answerInstance);

        return {
            createdInstances: [questionInstance, edgeToAnswerInstance, answerInstance],
            questionInstance: questionInstance,
            qaObjectsLeft: qaObjectsLeft,
        }
    }

}