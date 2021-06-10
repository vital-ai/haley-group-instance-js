import { GraphObject } from './type';
import { TYPE_HALEY_GROUP, EDGE_SECTION, TYPE_HALEY_QUESTION } from './type-haley-ai-question';
import {
    EDGE_QUESTION,
    SHORT_NAME_EDGE_DESTINATION,
    EDGE_QUESTION_INSTANCE,
    EDGE_ANSWER,
    SHORT_NAME_EDGE_SOURCE,
    EDGE_ANSWER_OPTION,
    EDGE_ANSWER_CONSTRAINT,
    EDGE_ANSWER_DEPENDENCY,
    EDGE_ANSWER_OPTION_DEPENDENCY,
    EDGE_ANSWER_OPTION_VALUE_DEPENDENCY,
    EDGE_TAXONOMY,
    EDGE_ANSWER_INSTANCE,
    EDGE_SETS,
} from './type-haley-ai-question';

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

    private _mappingSourceUriToEdges: Map<string, GraphObject[]> = new Map<string, GraphObject[]>();
    private _mappingDestinationUriToEdges: Map<string, GraphObject> = new Map<string, GraphObject>();
    private _mappingQuestionUriToQuestionTree: Map<string, QuestionTree> = new Map<string, QuestionTree>();
    // private _mappingQuestionURIToItsAnswerEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();
    // private _mappingAnswerURIToItsDescendantEdges: Map<string, GraphObject[]> =  new Map<string, GraphObject[]>();

    private _mappingQuestionInstanceUriToQuestionInstanceTree: Map<string, QuestionInstanceTree> = new Map<string, QuestionInstanceTree>();
    // private _mappingQuestionInstanceURIToItsAnswerInstanceEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();

    constructor(qaObjects: GraphObject[]) {
        this._qaObjects = qaObjects;
        qaObjects.forEach(obj => {
            if (!obj.type || !obj.URI) {
                throw new Error(`Graph object should have properties of URI and type. This object in the list has the following value URI=${obj.URI}, type=${obj.type}`);
            }
            this._mapUriToObject.set(obj.URI, obj);
            const objectsOfType: GraphObject[] = this._mapTypeToObjects.get(obj.type) as unknown as GraphObject[] || [];
            this._mapTypeToObjects.set(obj.type, [...objectsOfType, obj]);

            if (EDGE_SETS.has(obj.type)) {
                const sourceURI = obj.get(SHORT_NAME_EDGE_SOURCE);
                const destinationURI = obj.get(SHORT_NAME_EDGE_DESTINATION);

                const sourceEdges = this._mappingSourceUriToEdges.get(sourceURI) || [];
                this._mappingSourceUriToEdges.set(sourceURI, [...sourceEdges, obj]);
                this._mappingDestinationUriToEdges.set(destinationURI, obj);
            }
        });

        this.mapGroupGraph();
        this.mapGroupInstanceGraph();
    };

    private mapGroupGraph() {
        const group = this.getObjectsByType(TYPE_HALEY_GROUP)?.[0];
        if (!group) return;

        const toQuestionEdges = this.getObjectsByType(EDGE_QUESTION) || [];
        // const toAnswerEdges = this.getObjectsByType(EDGE_ANSWER) || [];
        // const fromAnswerEdges = [
        //     ...this.getObjectsByType(EDGE_ANSWER_OPTION),
        //     ...this.getObjectsByType(EDGE_ANSWER_CONSTRAINT),
        //     ...this.getObjectsByType(EDGE_ANSWER_DEPENDENCY),
        //     ...this.getObjectsByType(EDGE_ANSWER_OPTION_DEPENDENCY),
        //     ...this.getObjectsByType(EDGE_ANSWER_OPTION_VALUE_DEPENDENCY),
        //     ...this.getObjectsByType(EDGE_TAXONOMY),
        // ];

        // fromAnswerEdges.forEach(edgeFromAnswer => {
        //     const answerURI = edgeFromAnswer.get(SHORT_NAME_EDGE_SOURCE);
        //     const edges = this._mappingAnswerURIToItsDescendantEdges.get(answerURI) || [];
        //     this._mappingAnswerURIToItsDescendantEdges.set(answerURI, [...edges, edgeFromAnswer]);
        // });

        // toAnswerEdges.forEach(edgeToAnswer => {
        //     const questionURI = edgeToAnswer.get(SHORT_NAME_EDGE_SOURCE);
        //     if (this._mappingQuestionURIToItsAnswerEdge.get(questionURI)) {
        //         this._isComplete = false;
        //         this._inCompleteMessages.push(`Question ${questionURI} connected to two answer edge`);
        //     }
        //     this._mappingQuestionURIToItsAnswerEdge.set(questionURI, edgeToAnswer);
        // });

        for (let i = 0; i < toQuestionEdges.length; i++) {
            const edgeToQuestion = toQuestionEdges[i];
            const questionURI = edgeToQuestion.get(SHORT_NAME_EDGE_DESTINATION);
            let question: GraphObject;

            question = this._mapUriToObject.get(questionURI);
            if (!question) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the question object URI=${questionURI}, which is the destination of edge ${edgeToQuestion.URI}`);
                continue;
            }
            
            const edgeToAnswer = this._mappingSourceUriToEdges.get(questionURI)?.[0];

            if (!edgeToAnswer) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find any edge from question${questionURI} to answer.`);
            }

            const answerURI = edgeToAnswer.get(SHORT_NAME_EDGE_DESTINATION);

            const answer = this._mapUriToObject.get(answerURI);

            if (!answer) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the answer object ${answerURI}, which is the destination of edge ${edgeToAnswer.URI}`);
                continue;
            }

            const fromAnswerEdges = this._mappingSourceUriToEdges.get(answerURI) || [];

            const answerTree: GraphObject[] = [];

            for (let i = 0; i < fromAnswerEdges.length; i++) {
                const edge = fromAnswerEdges[i];
                const destinationURI = edge.get(SHORT_NAME_EDGE_DESTINATION);
                const destination = this._mapUriToObject.get(destinationURI);
                if (!destination) {
                    this._isComplete = false;
                    this._inCompleteMessages.push(`Could not find the object URI ${destinationURI}, which is the destination object of edge ${edge.URI}`);
                    continue;
                }
                answerTree.push(edge);
                answerTree.push(destination);
            };

            this._mappingQuestionUriToQuestionTree.set(questionURI, {
                edgeToQuestion,
                question,
                edgeToAnswer,
                answer,
                answerTree,
            });
        };

        const edgeToSections = this.getObjectsByType(EDGE_SECTION);

        for(let i = 0; i < edgeToSections.length; i++) {
            const edgeToSection = edgeToSections[i];
            const sectionURI = edgeToSection.get(SHORT_NAME_EDGE_DESTINATION);

            const section = this.getObjectByURI(sectionURI);

            if (!section) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find section object ${sectionURI}, which is the destination object of Edge ${edgeToSection.URI}`);
                continue;
            }

            const edgesFromSection = this._mappingSourceUriToEdges.get(sectionURI);

            for (let j = 0; j < edgesFromSection.length; j++) {
                const edgeFromSection = edgesFromSection[j];
                const objectURI = edgeFromSection.get(SHORT_NAME_EDGE_DESTINATION);

                const obj = this.getObjectByURI(objectURI);

                // question object will be detect by the code above this for loop
                if (edgeFromSection?.type === EDGE_QUESTION) continue;

                if (!obj) {
                    this._isComplete = false;
                    this._inCompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromSection.URI}`);
                    continue;
                }

                const rowURI = objectURI;

                const edgesFromRow = this._mappingSourceUriToEdges.get(rowURI);

                for (let k = 0; k < edgesFromRow.length; k++) {
                    const edgeFromRow = edgesFromRow[k];
                    const objectURI = edgeFromRow.get(SHORT_NAME_EDGE_DESTINATION);
    
                    const obj = this.getObjectByURI(objectURI);

                    if (edgeFromRow?.type === EDGE_QUESTION) continue;
    
                    if (!obj) {
                        this._isComplete = false;
                        this._inCompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromRow.URI}`);
                        continue;
                    }

                    // const rowRowURI = objectURI;

                    // const edgesFromRowRow = this._mappingSourceUriToEdges.get(rowRowURI);

                    // for (let l = 0; l < edgesFromRowRow.length; l++) {
                    //     const edgeFromRowRow = edgesFromRowRow[l];
                    //     const objectURI = edgeFromRowRow.get(SHORT_NAME_EDGE_DESTINATION);
        
                    //     const obj = this.getObjectByURI(objectURI);
        
                    //     if (!obj) {
                    //         this._isComplete = false;
                    //         this._inCompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromRowRow.URI}`);
                    //         continue;
                    //     }
                        
                    // }
                }
            }
        }
    }

    private mapGroupInstanceGraph() {
        const toQuestionInstanceEdges = this.mapTypeToObjects.get(EDGE_QUESTION_INSTANCE) || [];
        // const toAnswerInstanceEdges = this.mapTypeToObjects.get(EDGE_ANSWER_INSTANCE) || [];

        // toAnswerInstanceEdges.forEach(edgeToAnswerInstance => {
        //     const questionInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_SOURCE);
        //     if (this._mappingQuestionInstanceURIToItsAnswerInstanceEdge.get(questionInstanceURI)) {
        //         this._isComplete = false;
        //         this._inCompleteMessages.push(`QuestionInstance ${questionInstanceURI} connected to two answer edge`);
        //     }
        //     this._mappingQuestionInstanceURIToItsAnswerInstanceEdge.set(questionInstanceURI, edgeToAnswerInstance);
        // });

        for (let i = 0; i < toQuestionInstanceEdges.length; i++) {
            const edgeToQuestionInstance = toQuestionInstanceEdges[i];
            const questionInstanceURI = edgeToQuestionInstance.get(SHORT_NAME_EDGE_DESTINATION);

            if (!questionInstanceURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestionInstance.URI} does not target to any object`);
                continue;
            }

            const questionInstance = this._mapUriToObject.get(questionInstanceURI);
            if (!questionInstance) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the destination object of Edge ${edgeToQuestionInstance.URI}`);
                continue;
            }

            const edgeToAnswerInstance = this._mappingSourceUriToEdges.get(questionInstanceURI)?.[0];

            if (!edgeToAnswerInstance) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find any edge from question${questionInstanceURI} to answer.`);
                continue;
            }
            const answerInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_DESTINATION);

            if (!answerInstanceURI) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Edge ${edgeToQuestionInstance.URI} does not target to any object`);
                continue;
            }

            const answerInstance = this._mapUriToObject.get(answerInstanceURI);

            if (!answerInstance) {
                this._isComplete = false;
                this._inCompleteMessages.push(`Could not find the answer object ${answerInstanceURI}`);
                continue;
            }

            this._mappingQuestionInstanceUriToQuestionInstanceTree.set(questionInstanceURI, {
                edgeToQuestionInstance,
                questionInstance,
                edgeToAnswerInstance,
                answerInstance
            });
            
        };
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