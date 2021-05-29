import { GraphObject } from '../util/type';
import {GraphContainer} from './graph-container';

export class GroupInstanceGraphContainer extends GraphContainer{
    private _groupInstance: GraphObject;

    constructor(qaInstanceObjects: GraphObject[], groupInstance: GraphObject) {
        super(qaInstanceObjects);
        this._groupInstance = groupInstance;
    }

    get groupInstance(): GraphObject {
        return this._groupInstance;
    }

    get groupInstanceURI(): string {
        return this._groupInstance.URI;
    }

    get type(): string {
        return 'GroupInstanceGraph';
    }

}