import { getIframe, assign } from './utils'

function setShareData(shareData) {
  const divs = [
    {
      id: '__newsapp_sharetext',
      text: shareData.wbText
    }, {
      id: '__newsapp_sharephotourl',
      text: shareData.wbPhoto
    }, {
      id: '__newsapp_sharewxtext',
      text: shareData.wxText
    }, {
      id: '__newsapp_sharewxtitle',
      text: shareData.wxTitle
    }, {
      id: '__newsapp_sharewxurl',
      text: shareData.wxUrl
    }, {
      id: '__newsapp_sharewxthumburl',
      text: shareData.wxPhoto
    }
  ]
  let shareDom = document.getElementById('__newsapp__share__dom')
  // 不存在分享dom时，插入
  if (!shareDom) {
    shareDom = document.createElement('div')
    shareDom.id = '__newsapp__share__dom'
    shareDom.style.display = 'none'
    shareDom.innerHTML = divs.map((div) => {
      return `<div id="${div.id}">${div.text}</div>`
    }).join('')
    document.body.appendChild(shareDom)
    return
  }
  divs.forEach((div) => {
    div.text && (document.getElementById(div.id).textContent = div.text)
  })
}

function doSharing(ref1, ref2) {
  const callback = ref2 || ref1
  window.__newsapp_share_done = () => {
    window.__newsapp_share_done = null
    alert(1)
    callback && callback()
  }
  // 第一个参数shareData 可以省略
  if (typeof ref1 === 'object') {
    setShareData(ref1)
  }
  const iframe = getIframe()
  iframe.src = 'share://'
}

const share = {
  doSharing,
  setShareData
}
export default share
