/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'

export default class Menu {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.title = get(props, 'title', '')
    this.link = get(props, 'link', '/')
    this.icon = get(props, 'icon', '')
    this.parent_id = get(props, 'parent_id', 0)
    this.position = get(props, 'position', 0)

    // action
    this.createAction = 'createMenu'
    this.detailAction = 'getMenu'
    this.updateAction = 'updateMenu'
  }

  /**
   * Get form data
   */
  getFormData() {
    return {
      title: this.title,
      link: this.link,
      icon: this.icon,
      parent_id: this.parent_id,
      position: this.position,
      id: this.id
    }
  }
}
