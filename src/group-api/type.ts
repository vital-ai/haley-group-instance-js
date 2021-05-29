import { GraphObject } from "../util/type";
import { GroupGraphContainer } from '../graph-container/group-graph-container';
import { GroupInstanceGraphContainer } from '../graph-container/group-instance-graph-container';

export interface CreateQaInstancesOption {
    groupInstance?: GraphObject;
}

export interface SplitGraph {
    groupGraphContainerList: GroupGraphContainer[],
    instanceGraphContainerList: GroupInstanceGraphContainer[],
    generalGraphObjects: GraphObject[],
}