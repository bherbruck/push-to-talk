import { exec } from 'child_process'
import { app, Menu } from 'electron'
import { mic } from 'win-audio'
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
