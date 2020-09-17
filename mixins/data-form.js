/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  props: {
    /**
     * Model id
     */
    id: {
      type: Number,
      default: 0
    }
  },

  mounted() {
    this.getModel(this.id)
  },

  watch: {
    /**
     * Watching changes of id
     * Get detail
     */
    id(val) {
      this.getModel(val)
    }
  },

  data() {
    return {
      model: {}
    }
  },

  methods: {
    /**
     * Get item detail
     *
     * @param {Number} id
     */
    async getModel(id) {
      try {
        this.$store.dispatch('setLoading', true)
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
        const action = `${this.resource}/getModel`
        this.model = await this.$store.dispatch(action, { id })
      } catch (_) {
        this.$notification.error({
          message: this.$t('messages.error.failed_to_get', { name: this.resource })
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Validate before submit
     */
    validateBeforeSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$notification.error({
            message: this.$t('messages.error.input_error')
          })
        } else {
          this.handleSubmit()
        }
      })
    },

    /**
     * Event trigger on Submit
     */
    async handleSubmit() {
      try {
        this.$store.dispatch('setLoading', true)
        const action = `${this.resource}/saveModel`
        this.model = await this.$store.dispatch(action, this.model)

        this.$notification.success({
          message: this.$t(this.id ? 'messages.information.updated' : 'messages.information.created')
        })

        this.$emit('save')
      } catch (_) {
        this.$notification.error({
          message: this.$t(
            this.id ? 'messages.error.failed_to_update' : 'messages.error.failed_to_create',
            { name: this.resource }
          )
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
