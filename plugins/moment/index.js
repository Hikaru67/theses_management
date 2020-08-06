/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import Vue from 'vue'

import moment from 'moment'

Vue.use({
  install(Vue) {
    Vue.prototype.$moment = moment
  }
})

export default ({ app }) => {
  app.$moment = moment
}
