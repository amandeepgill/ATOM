const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  //Get Desktop size
  let screenSize =electron.screen.getPrimaryDisplay().size;

  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: screenSize.width, 
    height: screenSize.height,
    transparent: false,
    frame:true,
    backgroundColor: '#252624',
    maximizable:true,
    minimizable:true,
    fullscreen :false,
    icon:'images/ATOM.ico',
    title :'ATOM',
    autoHideMenuBar:false,
    darkTheme:true,
    titleBarStyle:'hiddenInset' 
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
  //pathname: path.join(__dirname, 'html/atomUI.html'),
   pathname: path.join(__dirname, 'html/Layout.html'),
   
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.maximize();

  // Open the DevTools.
   //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  require('./menu/mainmenu')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})












// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


/* 
const {Builder, By, Key, until} = require('selenium-webdriver');
let driver=new Builder()
.forBrowser('chrome')
.build();
var browser=driver.get('http:/google.com'); */

/* const {Builder, By, Key, until} = require('selenium-webdriver');
let driver=new Builder()
.forBrowser('internet explorer')
.build();
var browser=driver.get('http:/google.com'); 
 */


// init webdriverio
/* var client = require('webdriverio').remote({
  desiredCapabilities: {
      'browser': 'IE',
      'browser_version': '11.0'
  }
});
client
  .init()
 .url('http://www.google.com')
  .end(); */

