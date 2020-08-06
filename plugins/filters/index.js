import Vue from 'vue'
import moment from 'moment'

/**
 * price format
 * @param {Number} num
 * @return {String} formatted number
 */
const price = num => {
  return parent.$nuxt.$n(num, 'currency')
}

/**
 * date format
 * @param {Date} date
 * @param {String} format
 * @return {String} formatted date
 */
const date = (date, format = 'YYYY年MM月DD日 HH:MM:SS') => {
  const dateObj = moment(date)
  return dateObj.isValid() ? dateObj.format(format) : ''
}

/**
 * Format date in localization long format
 *
 * @param {Date|Timestamp} date Date value
 */
const localizeDateLong = date => {
  const dateObj = moment(date)

  return date && dateObj.isValid() ? parent.$nuxt.$d(date, 'long') : ''
}

/**
 * Format date in localization short format
 *
 * @param {Date|Timestamp} date Date value
 */
const localizeDateShort = date => {
  const dateObj = moment(date)

  return date && dateObj.isValid() ? parent.$nuxt.$d(date, 'short') : ''
}

const filters = {
  price,
  date,
  localizeDateLong,
  localizeDateShort
}

for (const propName of Object.getOwnPropertyNames(filters)) {
  if (filters[propName] instanceof Function) {
    Vue.filter(propName, filters[propName])
  }
}
