import { VitalJs, GraphObject } from './type';
import { SHORT_NAME_EDGE_SOURCE, SHORT_NAME_EDGE_DESTINATION } from './constant';

/**
 * Create vital Object based on the type given
 * @param type {String} type of graphObject
 * @return a GraphObject 
 */
export const createVitalObject = function(vitaljs: VitalJs, type: string, properties: { [key: string]: any }={}): GraphObject {
	if(!type) {
		console.error("Argument type is not pass in", type);
	}

	var parts = type.split('#');

	if(parts.length != 2 || !parts[1]) {
		console.error("This function could not support this type of objects creation", type, parts);
	}

    const obj: GraphObject = vitaljs.graphObject({type: type});
    
    obj.URI = 'http://vital.ai/haley.ai/haley-saas/' + parts[1] + '/' + new Date().getTime() + '-' + Math.round( 100000000000 * Math.random());
    
    Object.keys(properties).forEach(property => {
        obj.set(property, properties[property] || null);
    })
	
	return obj;
}


export const createEdgeObject = function(vitaljs: VitalJs, type: string, source?: GraphObject, destination?: GraphObject): GraphObject {
    const edge = createVitalObject(vitaljs, type);

    if (source) {
        edge.set(SHORT_NAME_EDGE_SOURCE, source?.URI || null);
    }

    if (destination) {
        edge.set(SHORT_NAME_EDGE_DESTINATION, destination?.URI || null);
    }

    return edge;
}