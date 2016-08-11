import { getIframe } from './utils'

let queue = []

function push(cmd) {
  const fromQueue = cmd.args[cmd.args.length - 1] === true
  if (!fromQueue) {
    // 不是从队列中shift出来的
    queue.push(cmd)
  }
  if (queue.length > 1 && !fromQueue) {
    // 队列中个数大于1 且 命令不是来自队列
    return false
  }
  return true
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
function _queue() {
  return queue
}

function invoke(scheme) {
  const iframe = getIframe()
  iframe.src = scheme
}
function clear() {
  queue = []
}
export default {
  push,
  shift,
  clear,
  _queue,
  invoke,
}
