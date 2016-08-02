import { getIframe } from './utils'

let queue = []

function push(cmd) {
  queue.push(cmd)
  return queue
}

function shift() {
  queue.shift()
  if (!queue.length) return
  const { func, args } = queue[0]
  func(...args, true)
}
function size() {
  return queue.length
}

function invoke(scheme) {
  const iframe = getIframe()
  iframe.src = scheme
}

export default {
  push,
  size,
  shift,
  invoke
}