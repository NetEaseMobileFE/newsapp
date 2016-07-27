import { getIframe, isNewsapp } from './utils'
export default function open(param) {
  const iframe = getIframe()
  const news = NEWS_TYPES.some(t => new RegExp(t.reg).test(param))
  if (!news) {
    console.error('param dont match any types ', param)
    return
  }
  if (isNewsapp) {
    iframe.src = news.scheme.replace('{{param}}', param)
  } else {
    window.location.href = news.href.replace('{{param}}', param)
  }
}
const NEWS_TYPES = [
  {
    type: 'article',
    reg: '/[A-Z0-9]{16}/',
    href: 'http://c.m.163.com/news/a/{{param}}.html',
    scheme: 'newsapp://doc/{{param}}'
  },
  {
    type: 'special',
    reg: '/^S[0-9]{13}/',
    href: 'http://c.m.163.com/news/s/{{param}}.html',
    scheme: 'newsapp://topic/{{param}}'
  },
  {
    type: 'web',
    reg: '/^http/',
    href: '{{param}}',
    scheme: 'newsapp://web/{{param}}'
  },
  {
    type: 'live',
    reg: '/\d{1,}/',
    href: 'http://c.m.163.com/news/l/{{param}}.html',
    scheme: 'newsapp://live/{{param}}'
  },
  {
    type: 'photo',
    reg: '/\d{4}\/\d{1,}/',
    href: 'http://c.m.163.com/news/p/{{param}}.html',
    scheme: 'newsapp://photo/{{param}}'
  },
  {
    type: 'video',
    reg: '/^V/',
    href: 'http://c.m.163.com/news/v/{{param}}.html',
    scheme: 'newsapp://video/{{param}}'
  },
  {
    type: 'reader',
    reg: '/^T[0-9]{13}/',
    href: '',
    scheme: '{{param}}'
  }
]