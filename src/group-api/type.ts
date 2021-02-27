export interface VitalJs {
    graphObject: (obj: any) => void;
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
}

export interface Logger {
    info: any;
    error: any;
}