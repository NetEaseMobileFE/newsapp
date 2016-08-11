import queue from './queue'
function get(...args) {
  const goon = queue.push({ func: get, args })
  if (!goon) {
    return
  }
  const callback = args[0]
  window.__newsapp_location_done = (info) => {
    window.__newsapp_location_done = null
    queue.shift()
    callback(info)
  }
  queue.invoke('location://current')
}
function change(...args) {
  const goon = queue.push({ func: change, args })
  if (!goon) {
    return
  }
  const callback = args[0]
  window.__newsapp_location_done = (info)=>{
    window.__newsapp_location_done = null
    callback(info)
  }
  queue.invoke('location://switch')
  queue.clear()
}
const location = {
  get,
  change
}
export default location
