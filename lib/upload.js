import { isAndroid, getIframe, removeIframe } from './utils'

// iOS 上传dom准备
function uploadDom () {
  let dom = document.getElementById('__newsapp__upload')
  if (!dom) {
    dom = document.createElement('input')
    dom.id = '__newsapp__upload'
    dom.type = 'file'
    dom.accept = 'image/*'
    dom.style.display = 'none'
    document.body.appendChild(dom)
  }
  return dom
}
/*
upload([options,] function)
*/

const canUseWebp = (() => {
  const elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
})()

export default function upload ({ width = 750, height = 10000, type = 'album', loadingStart, loadingEnd, callback }) {
  if (isAndroid) {
    const iframe = getIframe()
    window.__newsapp_upload_image_done = (imgUrl) => {
      window.__newsapp_upload_image_done = null
      removeIframe(iframe)
      const type = canUseWebp ? 'webp' : 'jpg'
      callback && callback(`//nimg.ws.126.net/?url=${encodeURIComponent(imgUrl)}&thumbnail=${width}x${height}&quality=${quality}&type=${type}`)
    }
    iframe.src = 'uploadImage://' + type
    return
  }
  const dom = uploadDom()
  dom.onchange = () => {
    const file = dom.files[0]
    if (!file || !/image/.test(file.type)) {
      alert('请上传图片类型')
      return
    }
    const formData = new FormData()
    formData.append('files', file)
    typeof options.loadingStart === 'function' && options.loadingStart()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://upfile.m.163.com/nos/upload/pub')
    xhr.onload = (e) => {
      let result = null
      if (xhr.status === 200) {
        result = JSON.parse(xhr.responseText)
      }
      typeof options.loadingEnd === 'function' && options.loadingEnd()
      callback(result ? `${result.url}?imageView&thumbnail=${width}x${height}&quality=75` : null)
    }
    xhr.send(formData)
  }
  dom.click()
}
