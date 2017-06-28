const express = require('express');
const app = express();
const fs = require("fs");
const config = require('../config/configurationModule.js');
let data = config.get();
const server = app.listen(8081, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("Listening at http://%s:%s", host, port)

});

let get = data.get;
for(let key in get){
    app.get(key,(req, res) => {
        res.end(JSON.stringify(get[key]))
    });
}

let post = data.post;
for(let key in post){
    app.post(key,(req, res) => {
        res.end(JSON.stringify(post[key]))
    });
}

server.on('close',()=>{
    console.log('Closing server')
});

process.on('exit',()=>{
    console.log('exiting child')
})