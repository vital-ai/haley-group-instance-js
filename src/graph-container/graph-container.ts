import { GraphObject } from '../util/type';
import { MappingUtil } from '../util/mapping-util';

export class GraphContainer {
    private _qaObjects: GraphObject[];
    private mappingUtil: MappingUtil;

    constructor(qaObjects: GraphObject[]) {
        this._qaObjects = qaObjects;
        this.mappingUtil = new MappingUtil(qaObjects);
    }

    has(uri: string): boolean {
        return this.mappingUtil.has(uri);
    }

    getObjectByURI(uri: string): GraphObject | null {
        return this.mappingUtil.getObjectByURI(uri);
    }

    getObjectsByType(type: string): GraphObject[] {
        return this.mappingUtil.getObjectsByType(type);
    }

    get all(): GraphObject[] {
        return this._qaObjects;
    }
}
