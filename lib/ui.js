import { getIframe } from './utils'

function title(text) {
  const iframe = getIframe()
  iframe.src = 'docmode://modifytitle/' + encodeURIComponent(text)
}

function button(ref1, ref2) {
  const iframe = getIframe()
  const text = typeof ref1 === 'function' ? ' ' : ref1
  const callback = typeof ref1 === 'function' ? ref1 : ref2
  if (text) {
    window.__newsapp_browser_actionbutton = () => {
      window.__newsapp_browser_actionbutton = null
      callback()
    }
  }
  iframe.src = 'docmode://actionbutton/' + encodeURIComponent(text)
}
const ui = {
  button,
  title
}
export default ui