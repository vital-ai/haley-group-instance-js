import { GraphObject } from "../util/type";
import { GroupGraphContainer } from '../graph-container/group-graph-container';
import { GroupInstanceGraphContainer } from '../graph-container/group-instance-graph-container';
import { GeneralGraphContainer } from "../graph-container/general-graph-container";

export interface CreateQaInstancesOption {
    groupInstance?: GraphObject;
}

export interface SplitGraph {
    groupGraphContainerList: GroupGraphContainer[],
    instanceGraphContainerList: GroupInstanceGraphContainer[],
    generalGraphObjects: GeneralGraphContainer,
}