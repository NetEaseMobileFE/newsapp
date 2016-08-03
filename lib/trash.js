import queue from './queue'
export default function trash(...args) {
  const goon = queue.push({ func: trash, args })
  if (!goon) {
    return
  }
  const callback = typeof args === 'function' ? args : args[0]
  window.__newsapp_trashid_done = (trashid) => {
    window.__newsapp_trashid_done = null
    queue.shift()
    callback(trashid)
  }
  queue.invoke('trashid://')
}