// import { get } from 'lodash'
// import Model from '~/models/Model'
// import Role from '~/models/Role'

// /*
//  * Copyright 2020 Digi Dinos JSC. All rights reserved.
//  * Email: tech@digidinos.com.
//  */

// export default class User extends Model {
//   constructor(props) {
//     super(props)
//     this.model = 'User'

//     this.id = get(props, 'id', 0)
//     this.name = get(props, 'name', '')
//     this.email = get(props, 'email', '')
//     this.status = get(props, 'status', 0)
//     this.password = get(props, 'password', null)
//     this.roles = get(props, 'roles', []).map(item => new Role(item))
//     this.roleId = get(props, 'roles[0].id', 0)

//     // action
//     this.createAction = 'createUser'
//     this.detailAction = 'getUser'
//     this.updateAction = 'updateUser'
//   }

//   /**
//    * Get form data
//    */
//   getFormData() {
//     if (this.password) {
//       return {
//         id: this.id,
//         name: this.name,
//         email: this.email,
//         status: this.status,
//         password: this.password,
//         roles: this.roles.map(item => item.id)
//       }
//     }

//     return {
//       id: this.id,
//       name: this.name,
//       email: this.email,
//       roles: this.roles.map(item => item.id)
//     }
//   }
// }

/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'
import Role from './Role'

export default class User {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.name = get(props, 'name', '')
    this.email = get(props, 'email', '')
    this.status = get(props, 'status', 0)
    this.password = get(props, 'password', null)
    this.roles = get(props, 'roles', []).map(item => new Role(item))
    this.roleId = get(props, 'roles[0].id', 0)

    // action
    this.createAction = 'createUser'
    this.detailAction = 'getUser'
    this.updateAction = 'updateUser'
  }

  /**
   * Get form data
   */
  getFormData() {
    if (this.password) {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        status: this.status,
        password: this.password,
        roles: this.roles.map(item => item.id)
      }
    }

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles.map(item => item.id)
    }
  }
}
