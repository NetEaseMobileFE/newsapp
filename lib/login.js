import { isNewsapp } from './utils'
import queue from './queue'
function getCookie (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
export default function login(...args) {
  const fromQueue = args[args.length - 1] === true
  if (!fromQueue) {
    // 不是从队列中shift出来的
    queue.push({ func: login, args })
  }

  if (queue.size() > 1 && !fromQueue) {
    // 队列中个数大于1 且 命令不是来自队列
    return
  }
  const showLogin = typeof args[0] === 'boolean' ? args[0] : false
  const _callback = typeof args[1] === 'function' ? args[1] : args[0]
  const callback = (...args) => {
    queue.shift()
    _callback(...args)
  }

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
  if (!showLogin) {
    queue.invoke('userinfo://')
    return
  }
  if (sInfo) {
    queue.invoke('userinfo://')
  } else {
    queue.invoke('login://')
  }
}
