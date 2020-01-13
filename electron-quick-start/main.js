const { app , BrowserWindow, ipcMain } = require('electron');

app.on('ready', ()=>{
  require('devtron').install();
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('index.html');
  // 开启调试
  mainWindow.webContents.openDevTools();

  ipcMain.on('message', (event,arg)=> {
    console.log(arg);
    // 主进程给 渲染进程发送信息
    event.reply('reply', 'hello form main process');
    
  })

  // let secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: mainWindow
  // });
  // secondWindow.loadFile('index.html')
});