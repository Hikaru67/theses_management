/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'

export default class Site {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.name = get(props, 'name', null)
    this.url = get(props, 'url', null)
    this.description = get(props, 'description', '') || ''
    this.file = get(props, 'file', [])
    this.upload_file = get(props, 'upload_file', [])
    this.status = get(props, 'status', 0)

    // action
    this.createAction = 'createSite'
    this.detailAction = 'getSite'
    this.updateAction = 'updateSite'
  }

  /**
  * Get form data
  */
  getFormData() {
    const data = {
      id: this.id,
      name: this.name,
      url: this.url,
      description: get(this, 'description', '') || '',
      file: this.file,
      upload_file: this.upload_file,
      status: this.status
    }

    return data
  }
}
