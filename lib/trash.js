import { getIframe, removeIframe } from './utils'

export default function getTrashId (callback) {
  const iframe = getIframe()
  window.__newsapp_trashid_done = (trashid) => {
    window.__newsapp_trashid_done = null
    removeIframe(iframe)
    callback(trashid)
  }
  iframe.src = 'trashid://'
}
