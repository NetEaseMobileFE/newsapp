import queue from './queue'
export default function device(...args) {
  const goon = queue.push({ func: device, args })
  if (!goon) {
    return
  }
  const callback = typeof args === 'function' ? args : args[0] 
  window.__newsapp_device_done = (deviceInfo) => {
    window.__newsapp_device_done = null
    queue.shift()
    callback(deviceInfo)
  }
  queue.invoke('device://')
}