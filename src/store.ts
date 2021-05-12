import * as Store from 'electron-store'
import { watchFile } from 'fs'
import { register } from './actions'

export const store = new Store()

export const defaultKeys = [162, 91]

export function create() {
  const keyCodeReference = `https://github.com/bherbruck/push-to-talk/blob/main/docs/key-codes.md`
  store.set('keyCodeReference', keyCodeReference)
  store.set('shortcut', store.get('shortcut') || defaultKeys)
  register(store.get('shortcut') || defaultKeys)

  watchFile(store.path, (curr, prev) => {
    register(store.get('shortcut') as number[])
  })
}
