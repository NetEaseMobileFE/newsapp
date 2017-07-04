import { getIframe, removeIframe } from './utils'

function get (callback) {
  window.__newsapp_location_done = (info) => {
    window.__newsapp_location_done = null
    removeIframe(iframe)
    callback(info)
  }
  const iframe = getIframe()
  iframe.src = 'location://current'
}
function change (callback) {
  window.__newsapp_location_done = (info) => {
    window.__newsapp_location_done = null
    removeIframe(iframe)
    callback(info)
  }
  const iframe = getIframe()
  iframe.src = 'location://switch'
}
const location = {
  get,
  change
}
export default location
