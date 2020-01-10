// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron')
const { BrowserWindow } = require('electron').remote

window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('node-version').innerHTML = process.versions.node;

    document.getElementById('send').addEventListener('click',()=>{
        // 渲染进程给 主进程发消息  事件名为message
        ipcRenderer.send('message', 'hello from renderer');

        let win = new BrowserWindow({width:400,height:300});
        win.loadURL('http://www.baidu.com');
    })
    ipcRenderer.on('reply',(event,arg)=>{
        document.getElementById('message').innerHTML = arg
    })
})
