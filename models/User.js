import Model from '~/models/Model'

export default class User extends Model {
  constructor(props) {
    super(props)
    this.model = 'User'
  }
}
