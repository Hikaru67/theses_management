/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import Vue from 'vue'

const PRESS_TIMEOUT = 1000

Vue.directive('auto-focus', {
  inserted: el => el.focus()
})

Vue.directive('click-away', {
  bind(el, { value }) {
    if (typeof value !== 'function') {
      return
    }

    document.addEventListener('click', e => el.contains(e.target) || value())
  }
})

Vue.directive('hold', {
  bind(el, { value }) {
    if (typeof value !== 'function') {
      return
    }

    let pressTimer = null

    const start = e => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
    ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
  }
})
