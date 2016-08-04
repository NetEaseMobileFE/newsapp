import queue from './queue'

function title(...args) {
  const goon = queue.push({ func: title, args })
  if (!goon) {
    return
  }
  const text = typeof args === 'string' ? args : args[0]
  queue.invoke('docmode://modifytitle/' + encodeURIComponent(text))
  setTimeout(() => {
    queue.shift()
  }, 300)
}

/*
NEWSAPPAPI.ui.button([text,] function, [fromQueue])
params types:
  string
  string, boolean
  string, function
  string, function, boolean
*/
function button(...args) {
  const goon = queue.push({ func: button, args })
  if (!goon) {
    return
  }
  let text = null
  let callback = null
  if (typeof args === 'string' || typeof args[0] === 'string') {
    text = typeof args === 'string' ? args : args[0]
  }
  if (args[1] && typeof args[1] === 'function') {
    callback = args[1]
  }
  if (callback) {
    window.__newsapp_browser_actionbutton = () => {
      callback()
    }
  }
  queue.invoke('docmode://actionbutton/' + encodeURIComponent(text))
  setTimeout(() => {
    queue.shift()
  }, 300)
}
export default {
  button,
  title
}
