/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'

export default class Permission {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.name = get(props, 'name', '')
    this.title = get(props, 'title', null)
    this.link = get(props, 'link', null)
    this.icon = get(props, 'icon', null)
    this.type = get(props, 'type', null)
    this.parent_id = get(props, 'parent_id', null)
    this.position = get(props, 'position', null)
  }
}
