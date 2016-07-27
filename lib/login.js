import { getIframe, isNewsapp } from './utils'

function getCookie (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
export default function login(callback) {
  const iframe = getIframe()
  window.__newsapp_login_done = (userInfo) => {
    window.__newsapp_login_done = null
    callback(userInfo)
  }
  window.__newsapp_login_canceled = () => {
    window.__newsapp_login_canceled = null
    callback(false)
  }
  window.__newsapp_userinfo_done = (userInfo) => {
    window.__newsapp_userinfo_done = null
    callback(userInfo)
  }
  const sInfo = getCookie('S_INFO')

  // 为了方便测试，在客户端以外判断sinfo
  if (!isNewsapp) {
    if (sInfo) {
      callback({
        name: sInfo.split('|')[0]        
      })
      return
    }
    callback(false)
    return
  }
  // 客户端中
  if (sInfo) {
    iframe.src = 'userInfo://'
  } else {
    iframe.src = 'login://'
  }
}