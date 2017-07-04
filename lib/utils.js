export function getIframe () {
  const id = guid()
  const iframe = document.createElement('iframe')
  iframe.id = 'iframe-' + id
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  return iframe
}

export function removeIframe (iframe) {
  iframe.parentElement.removeChild(iframe)
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4()
}

const ua = navigator.userAgent
export const isNewsapp = (/newsapp/ig).test(ua)
export const isIOS = !!ua.match(/ipad|ipod|iphone/i)
export const isAndroid = !!ua.match(/android/i)
export const assign = Object.assign || function(target) {
  'use strict'
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  target = Object(target)
  for (let index = 1; index < arguments.length; index++) {
    const source = arguments[index]
    if (source != null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}
