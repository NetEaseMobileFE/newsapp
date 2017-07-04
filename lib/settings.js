import { getIframe, removeIframe } from './utils'

export default function settings (callback) {
  const iframe = getIframe()
  window.__newsapp_settings_done = (info) => {
    window.__newsapp_settings_done = null
    removeIframe(iframe)
    callback(info)
  }
  iframe.src = 'settings://'
}
