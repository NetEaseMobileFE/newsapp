# newsapp

Interfaces for netease newsapp
> Start from [rollup-starter-project](https://github.com/rollup/rollup-starter-project)

## Usage

```
npm i --save newsapp

import NEWSAPPAPI from 'newsapp'
// or
import login from 'newsapp/lib/login'

// or
<scritp src="http://img6.cache.netease.com/utf8/3g/libs/newsapp.{{version}}.js"></scritp>
```
## APIs

```
// login
NEWSAPPAPI.login([showLogin,] callback)

// share
{
  wbText: '微博文案',
  wbPhoto: '微博图片',
  wxText: '微信文案',
  wxTitle: '微信标题',
  wxUrl: '微信地址',
  wxPhoto: '微信图片'
}
NEWSAPPAPI.share.setData(shareData)
NEWSAPPAPI.share.invoke([shareData,] callback)

// device
NEWSAPPAPI.getDeviceInfo(callback)

// trashId
NEWSAPPAPI.getTrashId(callback)

// location
NEWSAPPAPI.location.get(callback)
NEWSAPPAPI.location.change(callback)

// encrypt
NEWSAPPAPI.encrypt(callback)

// open
NEWSAPPAPI.open(param)

// copy
NEWSAPPAPI.open(callback)

// upload
NEWSAPPAPI.upload([options,] callback)
options : {
  width,
  height,
  loadingStart, // for ios
  loadingEnd, // for ios
  type: 'album' or 'camera' // for android
}

// ui
NEWSAPPAPI.ui.button(text, function) // set button
NEWSAPPAPI.ui.button(' ') // hide button
NEWSAPPAPI.ui.title(text)


```

## Changelogs
