/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const _c1 =
  'color: #0fb3f3; text-shadow: 0.5px 0.5px 0.5px #0fb3f3; font-size: 1.2em; font-weight: bold;'
const _c2 =
  'color: #f12f37; text-shadow: 0.5px 0.5px 0.5px #f12f37; font-size: 1.2em; font-weight: bold;'
const _c3 =
  'color: #4e4e50; text-shadow: 0.5px 0.5px 0.5px #4e4e50; font-size: 1.2em; font-weight: bold;'
const _c4 =
  'color: #F2600C; font-size: 1.2em; font-weight: bold;'

const log = (data, message = '') => {
  if (process.env.debug) {
    console.log(
      '%cD%cI%cG%cI%c%cD%cI%cN%cO%cS %c' + message,
      _c2,
      _c1,
      _c1,
      _c1,
      _c1,
      _c3,
      _c1,
      _c1,
      _c1,
      _c1,
      _c4,
      data
    )
  }
}

export default (context, inject) => {
  inject('debugger', {
    log
  })
}
