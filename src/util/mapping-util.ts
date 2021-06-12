import { GraphObject } from './type';
import { TYPE_HALEY_GROUP, EDGE_SECTION, EDGE_SECTION_INSTANCE } from './type-haley-ai-question';
import {
    EDGE_QUESTION,
    SHORT_NAME_EDGE_DESTINATION,
    EDGE_QUESTION_INSTANCE,
    SHORT_NAME_EDGE_SOURCE,
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
    private _incompleteMessages: string[] = [];

    private _mappingSourceUriToEdges: Map<string, GraphObject[]> = new Map<string, GraphObject[]>();
    private _mappingDestinationUriToEdges: Map<string, GraphObject> = new Map<string, GraphObject>();
    private _mappingQuestionUriToQuestionTree: Map<string, QuestionTree> = new Map<string, QuestionTree>();

    private _mappingQuestionInstanceUriToQuestionInstanceTree: Map<string, QuestionInstanceTree> = new Map<string, QuestionInstanceTree>();

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

        for (let i = 0; i < toQuestionEdges.length; i++) {
            const edgeToQuestion = toQuestionEdges[i];
            const questionURI = edgeToQuestion.get(SHORT_NAME_EDGE_DESTINATION);
            let question: GraphObject;

            question = this._mapUriToObject.get(questionURI);
            if (!question) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find the question object URI=${questionURI}, which is the destination of edge ${edgeToQuestion.URI}`);
                continue;
            }
            
            const edgeToAnswer = this._mappingSourceUriToEdges.get(questionURI)?.[0];

            if (!edgeToAnswer) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find any edge from question ${questionURI} to answer.`);
                continue;
            }

            const answerURI = edgeToAnswer.get(SHORT_NAME_EDGE_DESTINATION);

            const answer = this._mapUriToObject.get(answerURI);

            if (!answer) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find the answer object ${answerURI}, which is the destination of edge ${edgeToAnswer.URI}`);
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
                    this._incompleteMessages.push(`Could not find the object URI ${destinationURI}, which is the destination object of edge ${edge.URI}`);
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
                this._incompleteMessages.push(`Could not find section object ${sectionURI}, which is the destination object of Edge ${edgeToSection.URI}`);
                continue;
            }

            const edgesFromSection = this._mappingSourceUriToEdges.get(sectionURI) || [];

            for (let j = 0; j < edgesFromSection.length; j++) {
                const edgeFromSection = edgesFromSection[j];
                const objectURI = edgeFromSection.get(SHORT_NAME_EDGE_DESTINATION);

                const obj = this.getObjectByURI(objectURI);

                // question object will be detect by the code above this for loop
                if (edgeFromSection?.type === EDGE_QUESTION) continue;

                if (!obj) {
                    this._isComplete = false;
                    this._incompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromSection.URI}`);
                    continue;
                }

                const rowURI = objectURI;

                const edgesFromRow = this._mappingSourceUriToEdges.get(rowURI) || [];

                for (let k = 0; k < edgesFromRow.length; k++) {
                    const edgeFromRow = edgesFromRow[k];
                    const objectURI = edgeFromRow.get(SHORT_NAME_EDGE_DESTINATION);
    
                    const obj = this.getObjectByURI(objectURI);

                    if (edgeFromRow?.type === EDGE_QUESTION) continue;
    
                    if (!obj) {
                        this._isComplete = false;
                        this._incompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromRow.URI}`);
                        continue;
                    }
                }
            }
        }
    }

    private mapGroupInstanceGraph() {
        const toQuestionInstanceEdges = this.mapTypeToObjects.get(EDGE_QUESTION_INSTANCE) || [];

        for (let i = 0; i < toQuestionInstanceEdges.length; i++) {
            const edgeToQuestionInstance = toQuestionInstanceEdges[i];
            const questionInstanceURI = edgeToQuestionInstance.get(SHORT_NAME_EDGE_DESTINATION);

            const questionInstance = this._mapUriToObject.get(questionInstanceURI);
            if (!questionInstance) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find the questionInstance object URI=${questionInstanceURI}, which is the destination of edge ${edgeToQuestionInstance.URI}`);
                continue;
            }

            const edgeToAnswerInstance = this._mappingSourceUriToEdges.get(questionInstanceURI)?.[0];

            if (!edgeToAnswerInstance) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find any edge from question ${questionInstanceURI} to answer.`);
                continue;
            }
            const answerInstanceURI = edgeToAnswerInstance.get(SHORT_NAME_EDGE_DESTINATION);
            const answerInstance = this._mapUriToObject.get(answerInstanceURI);

            if (!answerInstance) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find the answerInstance object ${answerInstanceURI}, which is the destination of edge ${edgeToAnswerInstance.URI}`);
                continue;
            }

            this._mappingQuestionInstanceUriToQuestionInstanceTree.set(questionInstanceURI, {
                edgeToQuestionInstance,
                questionInstance,
                edgeToAnswerInstance,
                answerInstance
            });
        };

        const edgeToSectionInstances = this.getObjectsByType(EDGE_SECTION_INSTANCE);

        for(let i = 0; i < edgeToSectionInstances.length; i++) {
            const edgeToSectionInstance = edgeToSectionInstances[i];
            const sectionInstanceURI = edgeToSectionInstance.get(SHORT_NAME_EDGE_DESTINATION);

            const sectionInstance = this.getObjectByURI(sectionInstanceURI);

            if (!sectionInstance) {
                this._isComplete = false;
                this._incompleteMessages.push(`Could not find sectionInstance object ${sectionInstanceURI}, which is the destination object of Edge ${edgeToSectionInstance.URI}`);
                continue;
            }

            const edgesFromSectionInstance = this._mappingSourceUriToEdges.get(sectionInstanceURI) || [];

            for (let j = 0; j < edgesFromSectionInstance.length; j++) {
                const edgeFromSectionInstance = edgesFromSectionInstance[j];
                const objectURI = edgeFromSectionInstance.get(SHORT_NAME_EDGE_DESTINATION);

                const obj = this.getObjectByURI(objectURI);

                // question object will be detect by the code above this for loop
                if (edgeFromSectionInstance?.type === EDGE_QUESTION_INSTANCE) continue;

                if (!obj) {
                    this._isComplete = false;
                    this._incompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromSectionInstance.URI}`);
                    continue;
                }

                const rowInstanceURI = objectURI;

                const edgesFromRowInstance = this._mappingSourceUriToEdges.get(rowInstanceURI) || [];

                for (let k = 0; k < edgesFromRowInstance.length; k++) {
                    const edgeFromRowInstance = edgesFromRowInstance[k];
                    const objectURI = edgeFromRowInstance.get(SHORT_NAME_EDGE_DESTINATION);
    
                    const obj = this.getObjectByURI(objectURI);

                    if (edgeFromRowInstance?.type === EDGE_QUESTION_INSTANCE) continue;
    
                    if (!obj) {
                        this._isComplete = false;
                        this._incompleteMessages.push(`Could not find object ${objectURI}, which is the destination object of Edge ${edgeFromRowInstance.URI}`);
                        continue;
                    }
                }
            }
        }
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

    get incompleteMessages(): string[] {
        return this._incompleteMessages;
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