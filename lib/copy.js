import queue from './queue'
import { isAndroid } from './utils'
export default function copy(...args) {
  const goon = queue.push({ func: copy, args })
  if (!goon) {
    return
  }
  const text = args[0]
  if (isAndroid) {
    queue.invoke(`copy://${text}`)
  } else {
    queue.invoke(`copy://${encodeURIComponent(text)}`)
  }
  setTimeout(() => {
    queue.shift()
  }, 100)
}
