/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const Table = {
  props: {
    /**
     * Data list
     */
    data: {
      type: Array,
      default: () => []
    },

    /**
     * Loading status
     */
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Loading & icon loading
     *
     * @return {object} Loading & icon loading
     */
    tableLoading() {
      return {
        spinning: this.loading,
        indicator: <a-spin />
      }
    },

    /**
     * Locale for Table
     *
     * @return {object} Locale for Table
     */
    tableLocale() {
      return {
        emptyText: this.$t('common.no_data_in_table')
      }
    }
  }
}

export { Table }
export default Table
