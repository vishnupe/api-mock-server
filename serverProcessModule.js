const fork = require('child_process').fork;
const psTree = require('ps-tree');
let child;

function kill (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

function startServer(){
    if(!child){
        child = fork('server/server.js');
    }
}

function stopServer(callback){
    if(child){
        kill(child.pid,undefined,()=>{
            child = undefined;
            callback();
        });
    }
}

module.exports = {
    startServer,
    stopServer
}