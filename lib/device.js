import { getIframe, removeIframe } from './utils'

export default function device (callback) {
  window.__newsapp_device_done = (deviceInfo) => {
    window.__newsapp_device_done = null
    callback(deviceInfo)
    removeIframe(iframe)
  }
  const iframe = getIframe()
  iframe.src = 'device://'
}
