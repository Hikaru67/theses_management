/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */
import { get } from 'lodash'

const EVENT_MODIFY = 'modify'

const Common = {
  methods: {
    /**
     * On action
     *
     * @param {string} action - Action API
     * @param {object} data - Params API
     * @param {string} actionName - Action name
     */
    async onAction(action, data, actionName) {
      if (!action && !data && !actionName) {
        return
      }

      this.loading = true

      try {
        await this.$dam[action](data)

        this.loading = false

        this.$notification.success({
          message: this.$t('messages.information.action', { name: actionName })
        })

        this.$emit(EVENT_MODIFY)
      } catch (err) {
        console.error(err)
        this.loading = false

        const message = get(err, 'response.data.messages', null)

        if (message) {
          this.$notification.error({ message })
        } else {
          this.$notification.error({
            message: this.$t('messages.error.failed_to_action', { name: actionName })
          })
        }
      }
    }
  }
}

export { Common }
export default Common
