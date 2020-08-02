/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import DdApiManager from './dd-api-manager'

const options = process.env.dam || {}

const config = {
  baseURL: options.baseURL || '/',
  encode: options.encode || false,
  timeout: 30000
}

export default (context, inject) => {
  const dam = new DdApiManager(config, context)
  inject('dam', dam)
}
