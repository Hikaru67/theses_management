import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

class User {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.sequence = get(props, 'sequence', '')
    this.user_guardian_name_kanji = get(props, 'user_guardian_name_kanji', '')
    this.user_guardian_surname_kanji = get(props, 'user_guardian_surname_kanji', '')
    this.user_guardian_name_katakana = get(props, 'user_guardian_name_katakana', '')
    this.user_guardian_surname_katakana = get(props, 'user_guardian_surname_katakana', '')
    this.user_kanji_surname = get(props, 'user_kanji_surname', '')
    this.user_kanji_name = get(props, 'user_kanji_name', '')
    this.user_katakana_surname = get(props, 'user_katakana_surname', '')
    this.user_katakana_name = get(props, 'user_katakana_name', '')
    this.user_birthday = get(props, 'user_birthday', '').replace(/^\s+|\s+$/g, '')
    this.user_phone_number = get(props, 'user_phone_number', '')
    this.user_mail_address = get(props, 'user_mail_address', '')
    this.user_avatar = get(props, 'user_avatar', require('~/assets/images/avatar_default.png'))
    this.user_nick_name = get(props, 'user_nick_name', '')
    this.user_postal_code = get(props, 'user_postal_code', '')
    this.town = get(props, 'town', '')
    this.city = get(props, 'city', '')
    this.symptoms = get(props, 'symptoms', [])
    this.district = get(props, 'district', '')
    this.user_bio = get(props, 'user_bio', '')
  }
}

export const state = () => ({
  model: new User({}),
  list: []
})

export const getters = {
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new User(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new User(payload)
  }
}

export const actions = {
  /**
   * Get list user
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} user list
   */
  async getList({ commit }, payload) {
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.pageSize = params.pageSize || 20
    const { data } = await this.$api.indexUsers({ params })
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get user detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} user detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showUsers({ id })
      model = data.data
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
   * Create/Update user
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} user detail
   */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'userAvatar', 'userBirthday', 'userKanjiName', 'userKanjiSurname', 'userKatakanaName', 'userKatakanaSurname', 'userMailAddress', 'userNickName', 'userPhoneNumber', 'userPostalCode', 'userPassword', 'userStatus', 'userLevel'])
    form.roles = payload.roleIds

    const { data } = payload.id ? await this.$api.updateUsers(form) : await this.$api.storeUsers(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
