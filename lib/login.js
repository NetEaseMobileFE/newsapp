import { isNewsapp } from './utils'
import queue from './queue'
function getCookie (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
/*
NEWSAPPAPI.login([showLogin,] function, [fromQueue])
*/
export default function login(...args) {
  const goon = queue.push({ func: login, args })
  if (!goon) {
    return
  }
  const showLogin = typeof args[0] === 'boolean' ? args[0] : false
  const callback = typeof args[1] === 'function' ? args[1] : args[0]

  window.__newsapp_login_done = (userInfo) => {
    window.__newsapp_login_done = null
    queue.shift()
    callback(userInfo)
  }
  window.__newsapp_login_canceled = () => {
    window.__newsapp_login_canceled = null
    queue.shift()
    callback(false)
  }
  window.__newsapp_userinfo_done = (userInfo) => {
    window.__newsapp_userinfo_done = null
		if (!!userInfo) {
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
    queue.invoke('userinfo://')
    return
  }
  if (sInfo) {
    queue.invoke('userinfo://')
  } else {
    queue.invoke('login://')
    queue.clear()
  }
}
