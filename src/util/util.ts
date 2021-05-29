import { VitalJs, GraphObject } from './type';
import { SHORT_NAME_EDGE_SOURCE, SHORT_NAME_EDGE_DESTINATION, mappingTypeToDownStreamEdges } from './constant';
import { MappingUtil } from './mapping-util';

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
    });
	
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

export const getDestinationObjects = function(objects: GraphObject[], edgeType: string, source: GraphObject): GraphObject[] {
    const edges = objects.filter(obj => obj.type === edgeType && obj.get(SHORT_NAME_EDGE_SOURCE) === source.URI);
    const destinationURIs = edges.map(edge => edge.get(SHORT_NAME_EDGE_DESTINATION));
    const set: Set<string> = new Set(destinationURIs);
    return objects.filter(obj => set.has(obj.URI));
}

export const getSourceObject = function(objects: GraphObject[], edgeType: string, destination: GraphObject): GraphObject {
    const edge = objects.find(obj => obj.type === edgeType && obj.get(SHORT_NAME_EDGE_DESTINATION) === destination.URI);
    const sourceURI = edge.get(SHORT_NAME_EDGE_SOURCE);
    const source = objects.find(obj => obj.URI === sourceURI);
    if (!source) {
        throw new Error(`No source object found based on the provided object ${destination.URI} and edgeType ${edgeType}`)
    }
    return source;
}

export const isEdge = function(vitaljs: VitalJs, type: string): boolean {
    const rootEdge = 'http://vital.ai/ontology/vital-core#VITAL_Edge';
    if (type === rootEdge) return true;
    return vitaljs.isSubclassOf(type, rootEdge);
}


export const buildGraph = (root: GraphObject, graph: GraphObject[], mappingUtil: MappingUtil): void => {
    if (!root) return;

    graph.push(root);

    const edgeTypes = mappingTypeToDownStreamEdges.get(root.type);

    if (!edgeTypes) return;

    edgeTypes.forEach(edgeType => {
        let edges = mappingUtil.getObjectsByType(edgeType).filter(edge => edge.get(SHORT_NAME_EDGE_SOURCE) === root.URI);
        edges.forEach(edge => {
            const destinationObjectURI = edge.get(SHORT_NAME_EDGE_DESTINATION);
            if (!destinationObjectURI) {
                throw new Error(`Property ${SHORT_NAME_EDGE_DESTINATION} for edge ${edge.URI} is not set.`);
            }
            const destinationObject = mappingUtil.getObjectByURI(destinationObjectURI);
            if (!destinationObject) {
                throw new Error(`Could not find the destination object for edge ${edge.URI}`);
            }

            graph.push(edge);

            buildGraph(destinationObject, graph, mappingUtil);
        });
    });
}