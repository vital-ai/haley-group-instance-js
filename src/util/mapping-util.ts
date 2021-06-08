import { GraphObject } from './type';
import { EDGE_QUESTION, SHORT_NAME_EDGE_DESTINATION, EDGE_QUESTION_INSTANCE, EDGE_ANSWER, SHORT_NAME_EDGE_SOURCE, EDGE_ANSWER_OPTION, EDGE_ANSWER_CONSTRAINT, EDGE_ANSWER_DEPENDENCY, EDGE_ANSWER_OPTION_DEPENDENCY, EDGE_ANSWER_OPTION_VALUE_DEPENDENCY, EDGE_TAXONOMY, EDGE_ANSWER_INSTANCE } from './type-haley-ai-question';

interface QuestionTree {
    question: GraphObject;
    edgeToQuestion: GraphObject;
    answer: GraphObject;
    edgeToAnswer: GraphObject;
    answerTree: GraphObject[];
}

interface QuestionInstanceTree {
    questionInstance: GraphObject;
    edgeToQuestionInstance: GraphObject;
    answerInstance: GraphObject;
    edgeToAnswerInstance: GraphObject;
}

export class MappingUtil {

    private _qaObjects: GraphObject[];
    private _mapUriToObject: Map<string, GraphObject> = new Map<string, GraphObject>();
    private _mapTypeToObjects: Map<string, GraphObject[]> = new Map<string, GraphObject[]>();
    private _isComplete: boolean = true;
    private _inCompleteMessages: string[] = [];

    private _mappingQuestionUriToQuestionTree: Map<string, QuestionTree> = new Map<string, QuestionTree>();
    private _mappingQuestionURIToItsAnswerEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();
    private _mappingAnswerURIToItsDescendantEdges: Map<string, GraphObject[]> =  new Map<string, GraphObject[]>();

    private _mappingQuestionInstanceUriToQuestionInstanceTree: Map<string, QuestionInstanceTree> = new Map<string, QuestionInstanceTree>();
    private _mappingQuestionInstanceURIToItsAnswerInstanceEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();

    constructor(qaObjects: GraphObject[]) {
        this._qaObjects = qaObjects;
        qaObjects.forEach(obj => {
            if (!obj.type || !obj.URI) {
                throw new Error(`Graph object should have properties of URI and type. This object in the list has the following value URI=${obj.URI}, type=${obj.type}`);
            }
            this._mapUriToObject.set(obj.URI, obj);
            const objectsOfType: GraphObject[] = this._mapTypeToObjects.get(obj.type) as unknown as GraphObject[] || [];
            this._mapTypeToObjects.set(obj.type, [...objectsOfType, obj]);
        });

        this.mapGroupGraph();
        this.mapGroupInstanceGraph();
    };

    private mapGroupGraph() {
        const toQuestionEdges = this.mapTypeToObjects.get(EDGE_QUESTION) || [];
        const toAnswerEdges = this.mapTypeToObjects.get(EDGE_ANSWER) || [];
        const fromAnswerEdges = [
            ...this.mapTypeToObjects.get(EDGE_ANSWER_OPTION),
            ...this.mapTypeToObjects.get(EDGE_ANSWER_CONSTRAINT),
            ...this.mapTypeToObjects.get(EDGE_ANSWER_DEPENDENCY),
            ...this.mapTypeToObjects.get(EDGE_ANSWER_OPTION_DEPENDENCY),
            ...this.mapTypeToObjects.get(EDGE_ANSWER_OPTION_VALUE_DEPENDENCY),
            ...this.mapTypeToObjects.get(EDGE_TAXONOMY),
        ];

        fromAnswerEdges.forEach(edgeFromAnswer => {
            const answerURI = edgeFromAnswer.get(SHORT_NAME_EDGE_SOURCE);
            const edges = this._mappingAnswerURIToItsDescendantEdges.get(answerURI) || [];
            this._mappingAnswerURIToItsDescendantEdges.set(answerURI, [...edges, edgeFromAnswer]);
        });

        toAnswerEdges.forEach(edgeToAnswer => {
            const questionURI = edgeToAnswer.get(SHORT_NAME_EDGE_SOURCE);
            if (this._mappingQuestionURIToItsAnswerEdge.get(questionURI)) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Question ${questionURI} connected to two answer edge`);
            }
            this._mappingQuestionURIToItsAnswerEdge.set(questionURI, edgeToAnswer);
        });

        toQuestionEdges.forEach(edgeToQuestion => {
            const questionURI = edgeToQuestion.get(SHORT_NAME_EDGE_DESTINATION);
            let question: GraphObject;

            if (!questionURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestion.URI} does not target to any object`);
            } else {
                question = this._mapUriToObject.get(questionURI);
                if (!question) {
                    this._isComplete = false;
                    this._inCompleteMessages.push(`Could not find the destination object of Edge ${edgeToQuestion.URI}`);
                }
            }

            const edgeToAnswer = this._mappingQuestionURIToItsAnswerEdge.get(questionURI);

            if (!edgeToAnswer) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find any edge from question${questionURI} to answer.`);
            }

            const answerURI = edgeToAnswer.get(SHORT_NAME_EDGE_DESTINATION);

            if (!answerURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestion.URI} does not target to any object`);
            }

            const answer = this._mapUriToObject.get(answerURI);

            if (!answer) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the answer object ${answerURI}`);
            }

            const fromAnswerEdges = this._mappingAnswerURIToItsDescendantEdges.get(answerURI);

            const answerTree: GraphObject[] = [];

            fromAnswerEdges.forEach(edge => {
                const destinationURI = edge.get(SHORT_NAME_EDGE_DESTINATION);
                const destination = this._mapUriToObject.get(destinationURI);
                if (!destination) {
                    this._isComplete = false;
                    this._inCompleteMessages.push(`Could not find the destination object of edge ${edge.URI}`);
                }
                answerTree.push(edge);
                answerTree.push(destination);
            });

            this._mappingQuestionUriToQuestionTree.set(questionURI, {
                edgeToQuestion,
                question,
                edgeToAnswer,
                answer,
                answerTree,
            });
        });
    }

    private mapGroupInstanceGraph() {
        const toQuestionInstanceEdges = this.mapTypeToObjects.get(EDGE_QUESTION_INSTANCE) || [];
        const toAnswerInstanceEdges = this.mapTypeToObjects.get(EDGE_ANSWER_INSTANCE) || [];

        toAnswerInstanceEdges.forEach(edgeToAnswerInstance => {
            const questionInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_SOURCE);
            if (this._mappingQuestionInstanceURIToItsAnswerInstanceEdge.get(questionInstanceURI)) {
                this._isComplete = false;
                this._inCompleteMessages.push(`QuestionInstance ${questionInstanceURI} connected to two answer edge`);
            }
            this._mappingQuestionInstanceURIToItsAnswerInstanceEdge.set(questionInstanceURI, edgeToAnswerInstance);
        });

        toQuestionInstanceEdges.forEach(edgeToQuestionInstance => {
            const questionInstanceURI = edgeToQuestionInstance.get(SHORT_NAME_EDGE_DESTINATION);
            let questionInstance: GraphObject;

            if (!questionInstanceURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestionInstance.URI} does not target to any object`);
            } else {
                questionInstance = this._mapUriToObject.get(questionInstanceURI);
                if (!questionInstance) {
                    this._isComplete = false;
                    this._inCompleteMessages.push(`Could not find the destination object of Edge ${edgeToQuestionInstance.URI}`);
                }
            }

            const edgeToAnswerInstance = this._mappingQuestionURIToItsAnswerEdge.get(questionInstanceURI);

            if (!edgeToAnswerInstance) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find any edge from question${questionInstanceURI} to answer.`);
            }

            const answerInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_DESTINATION);

            if (!answerInstanceURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestionInstance.URI} does not target to any object`);
            }

            const answerInstance = this._mapUriToObject.get(answerInstanceURI);

            if (!answerInstance) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the answer object ${answerInstanceURI}`);
            }

            this._mappingQuestionInstanceUriToQuestionInstanceTree.set(questionInstanceURI, {
                edgeToQuestionInstance,
                questionInstance,
                edgeToAnswerInstance,
                answerInstance
            });
        });
    }

    get mapUriToObject(): Map<string, GraphObject> {
        return this._mapUriToObject;
    }
    
    get mapTypeToObjects(): Map<string, GraphObject[]> {
        return this._mapTypeToObjects;
    }

    get isComplete(): boolean {
        return this._isComplete;
    }

    get inCompleteMessages(): string[] {
        return this._inCompleteMessages;
    }

    getObjectByURI(uri: string): GraphObject | null {
        return this._mapUriToObject.get(uri) || null;
    }

    getObjectsByType(type: string): GraphObject[] {
        return this._mapTypeToObjects.get(type) || [];
    }

    has(uri: string): boolean {
        return !!this.getObjectByURI(uri);
    }
}