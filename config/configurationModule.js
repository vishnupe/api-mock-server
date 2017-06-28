var jsonfile = require('jsonfile')
var path = require('path')
var file = path.resolve(__dirname, 'config.json')
function get(){
    return jsonfile.readFileSync(file);
}
function set(config){
    jsonfile.writeFileSync(file, config);
}
module.exports = {
    get,
    set
}