import { getIframe, removeIframe } from './utils'

function setData (shareData) {
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
    document.body.appendChild(shareDom)
  }
  shareDom.innerHTML = divs.map((div) => {
    return div.text ? `<div id="${div.id}">${div.text}</div>` : ''
  }).join('')
}

/*
NEWSAPPAPI.share.invoke([shareData, platform,] function)
*/
function invoke ({ shareData, platform, callback }) {
  const iframe = getIframe()
  window.__newsapp_share_done = () => {
    window.__newsapp_share_done = null
    removeIframe(iframe)
    callback && callback()
  }
  !!shareData && setData(shareData)
  iframe.src = 'share://' + platform
}

const share = {
  invoke,
  setData
}
export default share
