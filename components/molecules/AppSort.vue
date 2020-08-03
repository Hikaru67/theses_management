<template>
  <div class="app-sort">
    <span v-if="name" class="txt-sort">{{ name }}</span>

    <a-select
      :value="value"
      :disabled="disabled"
      class="sort-select"
      @change="onSortChange"
    >
      <a-select-option
        v-for="item in list"
        :key="item.id"
        :value="item.id"
      >
        {{ item.label }}
        <template v-if="item.id !== -1">
          {{ item.sortType === SORT_TYPE.ASC ? $t('sort.sort_asc') : $t('sort.sort_desc') }}
        </template>
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { SORT_TYPE } from '~/constants'

const EVENT_SORT_CHANGE = 'sort-change'

export default {
  props: {
    /**
     * Sort list
     */
    list: {
      type: Array,
      default: () => []
    },

    /**
     * Value
     */
    value: {
      type: Number,
      default: 0
    },

    /**
     * Name
     */
    name: {
      type: String,
      default: 'Sort'
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
     * Get SORT_TYPE
     *
     * @return {Object} SORT_TYPE
     */
    SORT_TYPE() {
      return SORT_TYPE
    }
  },

  methods: {
    /**
     * Event when change sort
     *
     * @param {Number} id - Sort id
     */
    onSortChange(id) {
      this.$emit(EVENT_SORT_CHANGE, id)
    }
  }
}
</script>
