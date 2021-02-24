import { VitalJs, GraphObject, MsgRL } from './type';

class GroupAPI {

    vitaljs: VitalJs;
    objList: GraphObject[];
    instanceList: GraphObject[];
    msgRL: MsgRL;
    
    constructor(vitaljs: VitalJs, objList: GraphObject[], instanceList: GraphObject[]) {
        this.vitaljs = vitaljs;
        this.objList = objList;
        this.instanceList = instanceList;
        this.msgRL = vitaljs.resultList();
        (objList || []).forEach(obj => this.msgRL.addResult(obj));
        (instanceList || []).forEach(obj => this.msgRL.addResult(obj));
    }

    setValue({}) {

    }

    getValue({}) {
        
    }


}