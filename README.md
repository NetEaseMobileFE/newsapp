# newsapp

> Start from [rollup-starter-project](https://github.com/rollup/rollup-starter-project)

## Usage

```
npm i --save newsapp

import NEWSAPPAPI from 'newsapp'
// or
import login from 'newsapp/lib/login'
```
## APIs
```
// login
NEWSAPPAPI.login(callback)

// share
{
  wbText: '微博文案',
  wbPhoto: '微博图片',
  wxText: '微信文案',
  wxTitle: '微信标题',
  wxUrl: '微信地址',
  wxPhoto: '微信图片'
}
NEWSAPPAPI.setShareData(shareData)
NEWSAPPAPI.doSharing([shareData,] callback)

// device
NEWSAPPAPI.getDeviceInfo(callback)

// trashId
NEWSAPPAPI.getTrashId(callback)

```

## Changelogs
