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
      loading: false,
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
      this.$store.dispatch('setLoading', true)
      const action = `${this.resource}/getModel`
      this.model = await this.$store.dispatch(action, { id })
      this.$store.dispatch('setLoading', false)
    },

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
      this.$store.dispatch('setLoading', true)
      const action = `${this.resource}/saveModel`
      this.model = await this.$store.dispatch(action, this.model)
      this.$store.dispatch('setLoading', false)
      this.$emit('save')
    }
  }
}
