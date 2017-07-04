import { isAndroid, getIframe, removeIframe } from './utils'
export default function copy (text) {
  const iframe = getIframe()
  if (isAndroid) {
    iframe.src = `copy://${text}`
  } else {
    iframe.src = `copy://${encodeURIComponent(text)}`
  }
  setTimeout(() => {
    removeIframe(iframe)
  }, 100)
}
