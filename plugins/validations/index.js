/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const MAX_EMAIL_LENGTH = 255
const MAX_USER_NAME_LENGTH_IN_EMAIL = 64

/**
 * Check including the email format.
 */
const emailValidator = (rule, value, callback) => {
  if (!value) {
    return callback()
  }

  const name = parent.$nuxt.$t('common.email')
  const email = String(value)
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim

  if (email.length > 0 && !regexp.test(email.trim())) {
    callback(
      new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name }))
    )
  } else if (email.trim().length > MAX_EMAIL_LENGTH) {
    callback(
      new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name }))
    )
  } else {
    const emailParts = email.trim().split('@')
    if (!emailParts.length) {
      callback(
        new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name }))
      )
    }

    const userNamePart = emailParts[0]
    if (userNamePart.trim().length > MAX_USER_NAME_LENGTH_IN_EMAIL) {
      callback(
        new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name }))
      )
    }

    callback()
  }
}

const Validator = {
  email: emailValidator
}

export default ({ app, store }, inject) => {
  inject('validator', Validator)
}
