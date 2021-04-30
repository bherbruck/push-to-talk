import { app, Menu, Tray } from 'electron'
import * as iohook from 'iohook'
import * as path from 'path'
import * as audio from 'win-audio'

if (!app.requestSingleInstanceLock()) app.quit()

app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath('exe'),
})

app.on('ready', () => {
  createTray()
  register([162, 91])
  audio.mic.mute()
})

iohook.useRawcode(true)
iohook.start(false)

let tray: Tray = null
let currentKeys = []
let isKeyDown = false

const mutedIcon = path.join(__dirname, '../assets/img/muted.png')
const unmutedIcon = path.join(__dirname, '../assets/img/unmuted.png')

function createTray() {
  tray = new Tray(mutedIcon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Exit',
      type: 'normal',
      click: () => {
        audio.mic.unmute()
        app.quit()
      },
    },
  ])
  tray.setToolTip('Push to Talk')
  tray.setContextMenu(contextMenu)
}

function press() {
  if (!isKeyDown) {
    console.log('unmute')
    audio.mic.unmute()
    tray.setImage(unmutedIcon)
    isKeyDown = true
  }
}

function release() {
  if (isKeyDown) {
    console.log('mute')
    audio.mic.mute()
    tray.setImage(mutedIcon)
    isKeyDown = false
  }
}

export function register(keys: number[]) {
  iohook.unregisterShortcut(currentKeys)
  iohook.registerShortcut(keys, press, release)
  currentKeys = keys
}
