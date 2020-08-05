/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { Parser, transforms } from 'json2csv'

class DownloadCSV {
  /**
   * parse data to csv
   *
   * @param {Array} data
   * @param {Object} options
   * @return {String} csv data
   */
  parse({ data, options = { transforms: [transforms.flatten()] } }) {
    const json2csvParser = new Parser(options)
    return json2csvParser.parse(data)
  }

  /**
   * download generated file
   *
   * @param {Array} data
   * @param {String} fileName
   */
  download({ rawData, fileName = (+new Date()) }) {
    if (process.client) {
      const blob = new Blob([rawData], { type: 'text/csv' })

      const element = window.document.createElement('a')
      element.href = window.URL.createObjectURL(blob)
      element.download = `${fileName}.csv`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      window.URL.revokeObjectURL(blob)
    }
  }

  /**
   * parse data and download
   *
   * @param {Array} data
   * @param {Object} options
   * @param {String} fileName
   */
  parseAndDownload({ data, options = { transforms: [transforms.flatten()] }, fileName = (+new Date()) }) {
    const rawData = this.parse({ data, options })
    this.download({ rawData, fileName })
  }
}

export default (context, inject) => {
  inject('csv', new DownloadCSV(context))
}
