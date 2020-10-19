/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },

  mounted() {
    this.getModel(this.id)
  },

  watch: {
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
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Validate before submit
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.$store.dispatch('setLoading', true)
            const action = `${this.resource}/saveModel`
            await this.$store.dispatch(action, this.model)

            this.$notification.success({
              message: this.$t('text.successfully')
            })

            this.$emit('save')
          } catch (_) {
            this.$notification.error({
              message: this.$t('text.something_wrong')
            })
          } finally {
            this.$store.dispatch('setLoading', false)
          }
        }
      })
    }
  }
}
