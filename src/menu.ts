import { exec } from 'child_process'
import { app, Menu } from 'electron'
import { mic } from 'win-audio'
import { tray } from './main'
import { store } from './store'

export const menu = Menu.buildFromTemplate([
  {
    label: '',
  },
  {
    label: 'Config',
    type: 'normal',
    click: () => {
      exec(store.path)
    },
  },
  {
    label: 'Exit',
    type: 'normal',
    click: () => {
      mic.unmute()
      app.quit()
    },
  },
])

export function updateMenu(itemIndex: number, text: string) {
  menu.items[itemIndex].label = text
  tray.setContextMenu(Menu.buildFromTemplate(menu.items))
}
