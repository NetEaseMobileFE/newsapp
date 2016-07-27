export function getIframe() {
  const id = '__newsapp__protocal__iframe'
  let iframe = document.getElementById(id)
  if (!!iframe) {
    return iframe
  }
  iframe = document.createElement('iframe')
  iframe.id = id
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  return iframe
}
export const isNewsapp = (/NewsApp/ig).test(navigator.userAgent)
export const assign = Object.assign || function(target) {
  'use strict'
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  target = Object(target)
  for (let index = 1; index < arguments.length; index++) {
    const source = arguments[index];
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
