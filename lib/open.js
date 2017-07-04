import { isNewsapp } from './utils'
import queue from './queue'
export default function open(...args) {
  const goon = queue.push({ func: open, args })
  if (!goon) {
    return
  }
  const param = args[0]
  const news = NEWS_TYPES.filter((t) => {
    return (new RegExp(t.reg)).test(param)
  })[0]
  if (!news) {
    console.error('param dont match any types ', param)
    return
  }
  if (isNewsapp) {
    queue.clear()
    queue.invoke(news.scheme.replace('{{param}}', param))
  } else {
    window.location.href = news.href.replace('{{param}}', param)
  }
}
const NEWS_TYPES = [
  {
    type: 'web',
    reg: '^http',
    href: '{{param}}',
    scheme: 'newsapp://web/{{param}}'
  },
  {
    type: 'article',
    reg: '[A-Z0-9]{16}',
    href: 'https://c.m.163.com/news/a/{{param}}.html',
    scheme: 'newsapp://doc/{{param}}'
  },
  {
    type: 'special',
    reg: '^S[0-9]{13}',
    href: 'https://c.m.163.com/news/s/{{param}}.html',
    scheme: 'newsapp://topic/{{param}}'
  },
  {
    type: 'photo',
    reg: '\\d{4}\\/\\d{1,}',
    href: 'https://c.m.163.com/news/p/{{param}}.html',
    scheme: 'newsapp://photo/{{param}}'
  },
  {
    type: 'live',
    reg: '\\d{1,}',
    href: 'https://c.m.163.com/news/l/{{param}}.html',
    scheme: 'newsapp://live/{{param}}'
  },
  {
    type: 'video',
    reg: '^V',
    href: 'https://c.m.163.com/news/v/{{param}}.html',
    scheme: 'newsapp://video/{{param}}'
  },
  {
    type: 'reader',
    reg: '^T\\d{13}',
    href: '',
    scheme: '{{param}}'
  }
]
