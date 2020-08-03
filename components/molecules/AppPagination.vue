<template>
  <div class="app-pagination">
    <div class="page-total">
      {{ $t('common.total') }}: {{ total }} {{ itemName }}
    </div>

    <a-select
      :value="pageSize"
      :disabled="disabled || !total"
      class="page-size"
      @change="onPageSizeChange"
    >
      <a-select-option
        v-for="(item, index) in PAGE_SIZES"
        :key="index"
        :value="item"
      >
        {{ item }}
      </a-select-option>
    </a-select>

    <a-pagination
      :current="currentPage"
      :total="total"
      :disabled="disabled || !total"
      class="nav-pagination"
      @change="onPageChange"
    />
  </div>
</template>

<script>
import { PAGE_SIZES } from '~/constants'

const EVENT_PAGE_SIZE_CHANGE = 'page-size-change'
const EVENT_PAGE_CHANGE = 'page-change'

export default {
  props: {
    /**
     * Current page
     */
    currentPage: {
      type: Number,
      default: 1
    },

    /**
     * Total record
     */
    total: {
      type: Number,
      default: null
    },

    /**
     * Number of items per page
     */
    pageSize: {
      type: Number,
      default: PAGE_SIZES[0]
    },

    /**
     * Item name
     */
    itemName: {
      type: String,
      default: ''
    },

    /**
     * Disabled status
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Get PAGE_SIZES
     *
     * @return {Array} PAGE_SIZES
     */
    PAGE_SIZES() {
      return PAGE_SIZES
    }
  },

  methods: {
    /**
     * Event when click to page number
     *
     * @param {Number} val - Page number
     */
    onPageChange(val) {
      this.$emit(EVENT_PAGE_CHANGE, +val)
    },

    /**
     * Event when change option page size number
     *
     * @param {Number} val - Page size number
     */
    onPageSizeChange(val) {
      this.$emit(EVENT_PAGE_SIZE_CHANGE, +val)
    }
  }
}
</script>
