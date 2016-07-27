import { getIframe } from './utils'
export default function copy(text) {
  const iframe = getIframe()
  iframe.src = `copy://${encodeURIComponent(text)}`
}