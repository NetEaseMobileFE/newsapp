import { getIframe, isAndroid } from './utils'
// iOS 上传dom准备
function uploadDom() {
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
export default function upload(ref1, ref2) {
  const options = typeof ref1 === 'object' ? ref1 : {}
  const { width = 750, height = 10000, type = 'album' } = options
  const callback = ref2 || ref1
  if (isAndroid) {
    window.__newsapp_upload_image_done = (imgUrl) => {
      window.__newsapp_upload_image_done = null
      callback(`http://s.cimg.163.com/i/${imgUrl.replace('http://', '')}.${width}x${height}.75.auto.jpg`)
    }
    const iframe = getIframe()
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
