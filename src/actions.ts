import * as iohook from 'iohook'
import { mic } from 'win-audio'
import { mutedIcon, unmutedIcon } from './assets'
import { tray } from './main'
import { updateMenu } from './menu'

iohook.useRawcode(true)
iohook.start(false)

export let isKeyDown = false

function press() {
  if (!isKeyDown) {
    mic.unmute()
    tray.setImage(unmutedIcon)
    isKeyDown = true
  }
}

function release() {
  if (isKeyDown) {
    mic.mute()
    tray.setImage(mutedIcon)
    isKeyDown = false
  }
}

export function register(keys: number[]) {
  iohook.unregisterAllShortcuts()
  iohook.registerShortcut(keys, press, release)
  updateMenu(0, `Shortcut: ${keys.join('+')}`)
}
