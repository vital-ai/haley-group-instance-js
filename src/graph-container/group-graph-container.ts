import { GraphObject } from '../util/type';
import {GraphContainer} from './graph-container';

export class GroupGraphContainer extends GraphContainer{
    private _group: GraphObject;

    constructor(qaObjects: GraphObject[], group: GraphObject) {
        super(qaObjects);
        this._group = group;
    }

    get group(): GraphObject {
        return this.group;
    }

    get groupURI(): string {
        return this._group.URI;
    }

    get type(): string {
        return 'GroupGraph';
    }
}