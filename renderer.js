// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let { ipcRenderer, remote } = require('electron');  
let main = remote.require("./main.js");
const config = require('./config/configurationModule.js');
let data = config.get();

let isServerStarted = false;


function handleServerButtonClick(){

    if(!isServerStarted){
        main.startServer();
        main.registerLogListner((response)=>{
            console.log(response[0])
        })
        console.log('Server started')
        document.getElementById('notification').style.display='block';
        isServerStarted = true;
        document.getElementById('server-btn').textContent = 'Stop server';
    }else{
        main.stopServer(()=>{
            console.log('Server closed')
            document.getElementById('notification').style.display='none';
            document.getElementById('server-btn').textContent = 'Start server';
            isServerStarted = false;
        });      
    }
    
}

function handleSaveButtonClick(){
    config.set(JSON.parse(document.getElementById('config').value));
}

document.getElementById('server-btn').addEventListener("click" , () =>{
    handleServerButtonClick()
})

document.getElementById('save-btn').addEventListener("click" , () =>{
    handleSaveButtonClick()
})

document.getElementById('config').textContent=JSON.stringify(data,null,2);

process.on('exit',()=>{
    console.log('exiting parent')
})

