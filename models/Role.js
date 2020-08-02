/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'
import Permission from './Permission'

export default class Role {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.name = get(props, 'name', '')
    this.permissions = get(props, 'permissions', []).map(item => new Permission(item))

    // action
    this.createAction = 'createRole'
    this.detailAction = 'getRole'
    this.updateAction = 'updateRole'
  }

  /**
   * Get form data
   */
  getFormData() {
    return {
      id: this.id,
      name: this.name,
      permissions: this.permissions.map(item => item.id)
    }
  }
}
