import queue from './queue'
export default function copy(...args) {
  const goon = queue.push({ func: copy, args })
  if (!goon) {
    return
  }
  const text = args[0]
  queue.invoke(`copy://${encodeURIComponent(text)}`)
  setTimeout(() => {
    queue.shift()
  }, 100)
}
