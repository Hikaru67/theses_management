/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'

export default class Category {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.name = get(props, 'name', '')
    this.position = get(props, 'position', 0)
    this.description = get(props, 'description', '')
    this.parent = get(props, 'parent', null)
    this.parentId = get(props, 'parent_id', 0)
    this.file_id = get(props, 'file_id', 0)
    this.file = get(props, 'file', {})

    // action
    this.createAction = 'createArticleCategory'
    this.detailAction = 'getArticleCategory'
    this.updateAction = 'updateArticleCategory'
  }

  /**
   * Get form data
   */
  getFormData() {
    const data = {
      id: this.id,
      name: this.name,
      position: this.position,
      description: this.description,
      parent_id: +this.parentId,
      file: this.file
    }
    return data
  }
}
