import { getIframe } from './utils'
export default function getDeviceInfo(callback) {
  const iframe = getIframe()
  window.__newsapp_device_done = (deviceInfo) => {
    window.__newsapp_device_done = null
    callback(deviceInfo)
  }
  iframe.src = 'device://'
}