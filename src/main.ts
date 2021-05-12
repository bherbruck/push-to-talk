import { app, Tray } from 'electron'
import { mic } from 'win-audio/src'
import { mutedIcon } from './assets'
import { menu } from './menu'
import * as store from './store'

if (!app.requestSingleInstanceLock()) app.quit()

app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath('exe'),
})

app.on('ready', () => {
  createTray()
  store.create()
  mic.mute()
})

app.on('before-quit', () => {
  mic.unmute()
})

export let tray: Tray = null

// maybe combine with menu module
function createTray() {
  tray = new Tray(mutedIcon)
  tray.setToolTip('Push to Talk')
  tray.setContextMenu(menu)
}
