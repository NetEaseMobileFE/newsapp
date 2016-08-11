import queue from './queue'
export default function getTrashId(...args) {
  const goon = queue.push({ func: device, args })
  if (!goon) {
    return
  }
  const callback = args[0]
  window.__newsapp_trashid_done = (trashid) => {
    window.__newsapp_trashid_done = null
    queue.shift()
    callback(trashid)
  }
  queue.invoke('trashid://')
}
