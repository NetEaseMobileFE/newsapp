import { isNewsapp, getIframe, removeIframe } from './utils'

import queue from './queue'
function getCookie (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
}
/*
NEWSAPPAPI.login(function, [showLogin])
*/
export default function login (callback, showLogin) {
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
		if (userInfo) {
			queue.invoke('login://')
		} else {
      queue.shift()
			callback(false)
		}
  }
  const sInfo = getCookie('S_INFO')

  // 为了方便测试，在客户端以外判断sinfo
  if (!isNewsapp) {
    if (sInfo) {
      queue.shift()
      callback({
        name: sInfo.split('|')[0]
      })
      return
    }
    queue.shift()
    callback(false)
    return
  }
  // 客户端中
  if (!showLogin) {
    iframe.src = 'userinfo://'
    return
  }
  if (sInfo) {
    iframe.src = 'userinfo://'
    queue.invoke('userinfo://')
  } else {
    queue.invoke('login://')
    queue.clear()
  }
}
