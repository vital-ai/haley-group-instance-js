import { GraphObject } from '../util/type';
import { GraphContainer } from './graph-container';

export class GeneralGraphContainer extends GraphContainer{

    constructor(qaObjects: GraphObject[]) {
        super(qaObjects);
    }

    get type(): string {
        return 'GeneralGraph';
    }
}
