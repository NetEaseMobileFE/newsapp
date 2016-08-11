import { isIOS } from './utils'
import queue from './queue'
export default function encrypt(...args) {
  const goon = queue.push({ func: encrypt, args })
  if (!goon) {
    return
  }
  const [text, callback] = args
  const encryptedText = encodeURIComponent(text)
  if (isIOS) {
    window.__newsapp_encrypt_done = (result) => {
      window.__newsapp_encrypt_done = null
      queue.shift()
      callback(result)
    }
    queue.invoke('encrypt://' + encryptedText)
    return
  }
  if (window.extra && window.extra.__newsapp_encrypt) {
    callback(window.extra.__newsapp_encrypt(encryptedText))
  }
}
