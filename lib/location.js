import { getIframe } from './utils'
function get(callback) {
  const iframe = getIframe()
  window.__newsapp_location_done = (info) => {
    window.__newsapp_location_done = null
    callback(info)
  }
  iframe.src = 'location://current'
}
function change(callback) {
  const iframe = getIframe()
  window.__newsapp_location_done = (info)=>{
    window.__newsapp_location_done = null
    callback(info)
  }
  iframe.src = 'location://switch'
}
const location = {
  get,
  change
}
export default location
