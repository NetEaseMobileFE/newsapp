import { getIframe, isIOS } from './utils'
export default function encrypt(text, callback) {
  const encryptedText = encodeURIComponent(text)
  if (isIOS) {
    window.__newsapp_encrypt_done = (result) => {
      window.__newsapp_encrypt_done = null
      callback(result)
    }
    const iframe = getIframe()
    iframe.src = 'encrypt://' + encryptedText
    return
  } 
  if (window.extra && window.extra.__newsapp_encrypt) {
    callback(window.extra.__newsapp_encrypt(encryptedText))
  }
}
