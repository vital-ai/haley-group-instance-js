export interface VitalJs {
    graphObject: (obj: any) => GraphObject;
    isSubclassOf: (childClass: string, parentClass: string) => boolean;
    resultList: () => MsgRL;
}

export interface MsgRL {
    addResult: (obj: GraphObject) => void;
    iterator: (type?: string) => GraphObject[];
    URI: string;
    type: string;
}

export interface GraphObject {
    get: (key: string) => any;
    set: (key: string, value: any) => any;
    URI: string;
    type: string; 
}

export interface SetValueProp extends GetValueProp {
    value: any;
    key: string;
}

export interface GetValueProp {
    rowCounter?: string;
    rowType?: string;
    answerType?: string;
    msgRL?: MsgRL;
}

export interface Logger {
    info: any;
    error: any;
}

export interface CreateInstancesResult {
    createdInstances: GraphObject[],
    qaObjectsLeft: GraphObject[],
}

export interface CreateSectionInstancesResult extends CreateInstancesResult {
    sectionInstance: GraphObject,
}

export interface CreateQuestionInstancesResult extends CreateInstancesResult {
    questionInstance: GraphObject,
}

export interface CreateRowInstancesResult extends CreateInstancesResult {
    rowInstance: GraphObject,
}