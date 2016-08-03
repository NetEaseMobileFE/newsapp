import { isIOS } from './utils'
import queue from './queue'
export default function encrypt(...args) {
  const goon = queue.push({ func: encrypt, args })
  if (!goon) {
    return
  }
  const [ text, _callback ] = args
  const callback = (..._args) => {
    queue.shift()
    _callback(..._args)
  }
  const encryptedText = encodeURIComponent(text)
  if (isIOS) {
    window.__newsapp_encrypt_done = (result) => {
      window.__newsapp_encrypt_done = null
      callback(result)
    }
    queue.invoke('encrypt://' + encryptedText)
    return
  } 
  if (window.extra && window.extra.__newsapp_encrypt) {
    callback(window.extra.__newsapp_encrypt(encryptedText))
  }
}
