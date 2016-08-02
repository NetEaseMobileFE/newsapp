import queue from './queue'

function title(text) {
  const iframe = getIframe()
  iframe.src = 'docmode://modifytitle/' + encodeURIComponent(text)
}

function button(args) {
  const fromQueue = args[args.length - 1] === true
  if (!fromQueue) {
    // 不是从队列中shift出来的
    queue.push({ func: button, args })
  }

  if (queue.size() > 1 && !fromQueue) {
    // 队列中个数大于1 且 命令不是来自队列
    return
  }
  const text = typeof args[0] === 'function' ? ' ' : args[0]
  const _callback = typeof args[0] === 'function' ? args[0] : ref2
  const callback = (...args) => {
    queue.shift()
    _callback(...args)
  }
  if (text) {
    window.__newsapp_browser_actionbutton = () => {
      callback()
    }
  }
  queue.invoke('docmode://actionbutton/' + encodeURIComponent(text))
}
const ui = {
  button,
  title
}
export default ui
