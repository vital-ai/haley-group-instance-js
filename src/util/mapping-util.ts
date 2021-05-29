import { GraphObject } from './type';
import { EDGE_QUESTION, SHORT_NAME_EDGE_DESTINATION, EDGE_QUESTION_INSTANCE, EDGE_ANSWER } from './constant';

interface QuestionTree {
    question: GraphObject;
    edgeToQuestion: GraphObject;
    answer: GraphObject;
    edgeToAnswer: GraphObject;
    answerTree: GraphObject[];
}

interface QuestionInstanceTree {
    question: GraphObject;
    edgeToQuestion: GraphObject;
    answer: GraphObject;
    edgeToAnswer: GraphObject;
    answerTree: GraphObject[];
}

export class MappingUtil {

    private _mapUriToObject: Map<string, GraphObject> = new Map<string, GraphObject>();
    private _mapTypeToObjects: Map<string, GraphObject[]> = new Map<string, GraphObject[]>();

    private _mappingQuestionUriToQuestionTree: Map<string, QuestionTree> = new Map<string, QuestionTree>();
    private _mappingQuestionInstanceUriToQuestionInstanceTree: Map<string, QuestionInstanceTree> = new Map<string, QuestionInstanceTree>();
    private _mappingQuestionURIToItsSourceEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();
    private _mappingQuestionURIToItsAnswerEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();
    private _mappingQuestionInstanceURIToItsSourceEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();
    private _mappingQuestionInstanceURIToItsAnswerInstanceEdge: Map<string, GraphObject> =  new Map<string, GraphObject>();

    constructor(qaObjects: GraphObject[]) {
        qaObjects.forEach(obj => {
            if (!obj.type || !obj.URI) {
                throw new Error(`Graph object should have properties of URI and type. This object in the list has the following value URI=${obj.URI}, type=${obj.type}`, obj);
            }
            this._mapUriToObject.set(obj.URI, obj);
            const objectsOfType: GraphObject[] = this._mapTypeToObjects.get(obj.type) as unknown as GraphObject[] || [];
            this._mapTypeToObjects.set(obj.type, [...objectsOfType, obj]);
        });

        // const toQuestionEdges = this.mapTypeToObjects.get(EDGE_QUESTION) || [];

        // const toQuestionInstanceEdges = this.mapTypeToObjects.get(EDGE_QUESTION_INSTANCE) || [];
        // const toAnswerEdges = this.mapTypeToObjects.get(EDGE_ANSWER) || [];

        // toQuestionEdges.forEach(edgeToQuestion => {
        //     const questionURI = edgeToQuestion.get(SHORT_NAME_EDGE_DESTINATION);
        //     if (!questionURI) {
        //         throw Error(`Edge ${edgeToQuestion.URI} does not target to any object`);
        //     }

        //     const question = this._mapUriToObject.get(questionURI);

        //     if (!question) {
        //         throw Error(`Could not find the destination object of Edge ${edgeToQuestion.URI}`);
        //     }
        // });
    };

    get mapUriToObject(): Map<string, GraphObject> {
        return this._mapUriToObject;
    }
    
    get mapTypeToObjects(): Map<string, GraphObject[]> {
        return this._mapTypeToObjects;
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