import Vue from 'vue'
import moment from 'moment-timezone'
export const TIMEZONE_JAPAN = 'Asia/Tokyo'

/**
 * Format date
 * @param {Date} date
 * @param {String} format
 * @return {String} formatted date
 */
const date = (date, format = 'YYYY年MM月DD日 HH:mm:ss') => {
  const dateObj = moment(date).tz(TIMEZONE_JAPAN)
  return dateObj.isValid() ? dateObj.format(format) : ''
}

const filters = {
  date
}

for (const propName of Object.getOwnPropertyNames(filters)) {
  if (filters[propName] instanceof Function) {
    Vue.filter(propName, filters[propName])
  }
}
