import {app, BrowserWindow, Menu} from 'electron';
import path from 'path';
import {format as formatUrl} from 'url';

const shell = require('electron').shell;

const isDevelopment = process.env.NODE_ENV !== 'production';

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 800,
    minHeight: 435,
    webPreferences: {webSecurity: false}, // disable cors
    title: 'Foreign Currencies',
    icon: path.join(__dirname, 'src/renderer/assets/icon/64x64.png')
  });

  //Open DevTools
  //window.webContents.openDevTools();

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }
  window.on('closed', () => {
    window = null;
  });

  //Menu added.
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Use API',
          click() {
            shell.openExternal(
              'https://github.com/prosman/dovizcom-api'
            );
          }
        },
        {
          label: 'View on GitLab',
          click() {
            shell.openExternal(
              'https://gitlab.com/erkansivas35/electron-vue-currency-app'
            );
          },
        },
        {type: 'separator'},
        {
          label: 'Exit App',
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});