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

    // action
    this.createAction = 'createCategory'
    this.detailAction = 'getCategory'
    this.updateAction = 'updateCategory'
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
      parent_id: +this.parentId
    }
    return data
  }
}
