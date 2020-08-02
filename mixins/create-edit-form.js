/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'

const EVENT_MODIFY = 'modify'

const CreateEditForm = {
  props: {
    /**
     * Model id
     */
    id: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    /**
     * Get item detail
     *
     * @param {Number} id
     */
    getDetail(id) {
      this.loading = true

      if (id) {
        const action = this.model.detailAction

        this.$dam[action]({ id })
          .then(res => {
            this.loading = false
            this.setModel(res.data)
          })
          .catch(err => {
            console.error(err)
            this.loading = false

            this.$notification.error({
              message: this.$t('messages.error.failed_to_get', { name: this.modelType })
            })
          })
      } else {
        this.setModel()
        this.loading = false
      }
    },

    /**
     * Event trigger on Submit
     */
    async onSubmit() {
      this.loading = true

      try {
        const formData = this.model.getFormData()
        const action = this.id ? this.model.updateAction : this.model.createAction

        await this.$dam[action](formData)

        this.loading = false

        this.$notification.success({
          message: this.$t(
            this.id ? 'messages.information.updated' : 'messages.information.created',
            { name: this.modelType }
          )
        })

        this.$emit(EVENT_MODIFY)
      } catch (err) {
        console.error(err)
        this.loading = false

        const errors = get(err, 'response.data.errors', null)
        const message = get(err, 'response.data.messages', null)

        if (errors && errors.email) {
          this.$notification.error({
            message: errors.email[0]
          })
        } if (message) {
          this.$notification.error({
            message
          })
        } else {
          this.$notification.error({
            message: this.$t(
              this.id ? 'messages.error.failed_to_update' : 'messages.error.failed_to_create',
              { name: this.modelType }
            )
          })
        }
      }
    }

  }
}

export { CreateEditForm }
export default CreateEditForm
