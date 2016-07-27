import { getIframe } from './utils'
export default function getTrashId(callback) {
  const iframe = getIframe()
  window.__newsapp_trashid_done = (trashid) => {
    window.__newsapp_trashid_done = null
    callback(trashid)
  }
  iframe.src = 'trashid://'
}