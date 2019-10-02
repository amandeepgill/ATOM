const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app


const template = [
  {
    label: 'Test',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click () {
          openTest();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click () {
          openTest();;
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click () {
          openTest();;
        }
      },
      {
        label: 'Save As...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click () {
          openTest();;
        }
      }
    ]
  },
  {
    label: 'Repository',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+R',
        click () {
          openTest();;
        }
      },
      {
        label: 'Load From JSON',
        accelerator: 'CmdOrCtrl+R',
        click () {
          openTest();;
        }
      },
      {
        label: 'Load From XML',
        accelerator: 'CmdOrCtrl+R',
        click () {
          openTest();;
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Save as XML',
        accelerator: 'CmdOrCtrl+X',
        click () {
          openTest();;
        }
      },
      {
        label: 'Save as JSON',
        accelerator: 'CmdOrCtrl+J',
        click () {
          openTest();;
        }
      }
    ]
  },
  {
    label: 'Spy',
    submenu: [
      {
        label: 'Start',
        click () {
          startSpy() ;
        }
      },
      {
        label: 'Stop',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      },
      {
        label: 'Settings',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        label:   'Toggle Spy View',
        type:    'checkbox',
        checked: false,
        click:   function (item, focusedWindow) {
         // console.log(item.checked)
          var pos=focusedWindow.getPosition();
          var winsize=electron.screen.getPrimaryDisplay().size.width;
          console.log(winsize)
          var settoSize=winsize*.8
          x=pos[0];
            if (x<settoSize){
              focusedWindow.setPosition(settoSize, 0);  
            }else {
              focusedWindow.setPosition(0, 0);
            }
        }
    },
      {
        role: 'togglefullscreen'
      },
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
]


  
  


function showmessg(){
  const settings = require('electron-settings');
  
  if(!settings.has('neverAskMeAgain')){ // this if might do it
      settings.set('neverAskMeAgain', {
          state: false
      });
  }
  
  if (!settings.get('neverAskMeAgain.state')) {
      electron.dialog.showMessageBox({
          type: 'info',
          buttons: ['Yes', 'No'],
          message: 'Are you sure?',
          checkboxLabel: 'Never ask me again',
          checkboxChecked: false
      }, (resp, checkboxChecked) => {
          if (resp === 0) {
              foo.bar();
              settings.set('neverAskMeAgain.state', checkboxChecked);
          }
      });
  } else if (settings.get('neverAskMeAgain.state')) {
      foo.bar();
  }
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


function openTest(){

}


function startSpy(){
/*   const ipcMain = electron.ipcMain
  ipcMain.
  remote.getCurrentWindow().setSize(600, 600); */



  const {Builder, By, Key, until} = require('selenium-webdriver');
  let driver=new Builder()
  .forBrowser('chrome')
  .build();
  //var URL='https://secure.ssa.gov/acu/ACU_KBA/main.jsp?URL=/apps8z/ARPI/main.jsp?locale=en&LVL=4'
  var URL='https://google.com';
  var browser=driver.get(URL);

  var fs = require('fs');

var fPath='js/jquery-3.2.1.js'
var JQscript = fs.readFileSync(fPath);
 fPath='js/Recorder_single.js'
 var InjSCript = fs.readFileSync(fPath);

driver.executeScript("var scriptElt = document.createElement('script');  scriptElt.type = 'text/javascript'; scriptElt.src = "+JQscript+" document.getElementsByTagName('head')[0].appendChild(scriptElt);");
driver.executeScript("var scriptElt = document.createElement('script');  scriptElt.type = 'text/javascript'; scriptElt.src = "+InjSCript+" document.getElementsByTagName('head')[0].appendChild(scriptElt);");

 // driver.executeScript("var s=window.document.createElement('script');\
 // .src=scriptContect;\
 // window.document.head.appendChild(s);");
};

