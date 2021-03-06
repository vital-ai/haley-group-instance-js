global.VITAL_JSON_SCHEMAS = [];
			
global.VITAL_LOGGING = true;

global.tv4 = require('./vitalservice/haley/lib-vital/vitalservice-js/tv4.min.js');

global.LRUCache = require('./vitalservice/haley/lib-vital/vitalservice-js/lru.js').LRUCache;

require('./vitalservice/haley/lib-vital/vitalservice-js/vital-core-0.2.304.js');
require('./vitalservice/haley/lib-vital/vitalservice-js/vital-0.2.304.js');

// loding vitalservice domains
var fs = require('fs');
var path = require('path');
var items = fs.readdirSync(path.join(__dirname + '/vitalservice/domains'));
for(var i = 0 ; i < items.length; i++) {
  var file = items[i];
  // console.log("Loading domain file: " + file);
  require(path.join(__dirname + '/vitalservice/domains', file));
}

var import1 = require('./vitalservice/haley/lib-vital/vitalservice-js/vitalservice-json-0.2.304.js');
const vitaljs = import1.vitaljs;
global.VitalServiceJson = import1.VitalServiceJson;

VitalServiceJson.SINGLETON = new VitalServiceJson(null, false);

module.exports.vitaljs = vitaljs;
