import { GraphObject, CreateInstancesResult } from '../group-api/type';

export class SectionAPI {

    static createQaInstanceObjects(section: GraphObject, qaObjects: GraphObject[]): CreateInstancesResult{

        return {
            createdInstances: [],
            qaObjectsLeft: [],
        };
    }
}