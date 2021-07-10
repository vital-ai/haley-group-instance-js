import { CreateQuestionInstancesResult, GraphObject, VitalJs } from '../util/type';
import { createVitalObject, createEdgeObject } from '../util/util';
import {
    SHORT_NAME_FOLLOWUP_TYPE,
    TYPE_FOLLOWUP_NO_ANSWER,
    SHORT_NAME_HALEY_ANSWER,
    SHORT_NAME_HALEY_QUESTION,
    TYPE_HALEY_QUESTION_INSTANCE,
    EDGE_ANSWER,
    SHORT_NAME_EDGE_SOURCE,
    SHORT_NAME_EDGE_DESTINATION,
    EDGE_ANSWER_INSTANCE,
    MAPPING_ANSWER_TO_ANSWER_INSTANCE,
    EDGE_QUESTION_INSTANCE,
    TYPE_HALEY_ANSWER_OPTION,
    EDGE_ANSWER_OPTION,
    TYPE_HALEY_CHOICE_ANSWER,
    TYPE_HALEY_MULTI_CHOICE_ANSWER,
} from '../util/type-haley-ai-question';


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
        obj.set(SHORT_NAME_FOLLOWUP_TYPE, TYPE_FOLLOWUP_NO_ANSWER);
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

    static getQaInstancesWithEdges(qaInstanceObjects: GraphObject[], questionInstance: GraphObject): [GraphObject, GraphObject, GraphObject, GraphObject] {
        const edgeToQuestionInstance = qaInstanceObjects.find(obj => obj.type === EDGE_QUESTION_INSTANCE && obj.get(SHORT_NAME_EDGE_DESTINATION) === questionInstance.URI);
        const edgeToAnswerInstance = qaInstanceObjects.find(obj => obj.type === EDGE_ANSWER_INSTANCE && obj.get(SHORT_NAME_EDGE_SOURCE) === questionInstance.URI);
        const answerInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_DESTINATION);
        const answerInstance = qaInstanceObjects.find(obj => obj.URI === answerInstanceURI);
        return [edgeToQuestionInstance, questionInstance, edgeToAnswerInstance, answerInstance];
    }

    static getAnswerOptions(qaObjects: GraphObject[], answer: GraphObject) {
        if (![TYPE_HALEY_CHOICE_ANSWER, TYPE_HALEY_MULTI_CHOICE_ANSWER].includes(answer.type)) return [];
        const edgeToOptions = qaObjects.filter(edge => edge.type === EDGE_ANSWER_OPTION && edge.get(SHORT_NAME_EDGE_SOURCE) === answer.URI);
        const optionsSet: Set<string> = new Set(edgeToOptions.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION)));
        const options = qaObjects.filter(obj => obj.type === TYPE_HALEY_ANSWER_OPTION && optionsSet.has(obj.URI));
        return options;
    }

}