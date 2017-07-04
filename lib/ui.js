import { getIframe, removeIframe } from './utils'

function title (text) {
  const iframe = getIframe()
  iframe.src = 'docmode://modifytitle/' + encodeURIComponent(text)
  setTimeout(() => {
    removeIframe(iframe)
  }, 300)
}

function button ({ text, callback }) {
  if (callback) {
    window.__newsapp_browser_actionbutton = () => {
      callback()
    }
  }
  const iframe = getIframe()
  iframe.src = 'docmode://actionbutton/' + encodeURIComponent(text)
  setTimeout(() => {
    removeIframe(iframe)
  }, 300)
}
export default {
  button,
  title
}
