/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { isObject } from 'lodash'

import {
  CodecUtils,
  CODEC_JSON,
  CODEC_BASE64
} from '~/plugins/codec-utils'

const ENCODE_OPTIONS = [CODEC_JSON, CODEC_BASE64]
const DECODE_OPTIONS = ENCODE_OPTIONS.concat().reverse()

/**
 * Encode condition
 *
 * @param {Object} condition - Condition query
 * @return {String} Encoded condition
 */
export const encodeCondition = condition => {
  if (!isObject(condition)) {
    return null
  }

  return CodecUtils.encode(condition, ENCODE_OPTIONS)
}

/**
 * Decode condition
 *
 * @param {Object} condition - Condition query
 * @return {String} Decoded condition
 */
export const decodeCondition = condition => {
  return CodecUtils.decode(condition, DECODE_OPTIONS)
}

const ConditionHandler = {
  data() {
    return {
      condition: {},
      isEncodedCondition: false
    }
  },

  computed: {
    /**
     * Get condition query
     *
     * @param {Object} Condition query
     */
    conditionQuery() {
      return this.isEncodedCondition ? { condition: this.condition } : this.condition
    }
  },

  created() {
    this.getConditionParamsFromRoute()
  },

  methods: {
    /**
     * Get params from route
     * Set condition when url has condition param
     */
    getConditionParamsFromRoute() {
      if (this.$route.query.condition && this.isEncodedCondition) {
        this.setCondition(this.decodeCondition(this.$route.query.condition))
      }

      if (this.$route.query.condition && !this.isEncodedCondition) {
        this.setCondition(this.$route.query.condition)
      }
    },

    /**
     * Encode condition
     */
    encodeCondition,

    /**
     * Decode condition
     */
    decodeCondition,

    /**
     * Set condition
     *
     * @param {Object} condition - Condition
     */
    setCondition(condition) {
      if (!isObject(condition)) {
        this.$debugger.log(condition, 'Invalid condition value, will be ignored.')
        return
      }

      this.$debugger.log(condition, 'Condition ->')
      this.condition = condition

      this.setConditionQueryToUrl()
    },

    /**
     * Set condition query to Url
     */
    setConditionQueryToUrl() {
      let query = {}

      if (this.isEncodedCondition) {
        query = Object.assign({}, this.$route.query, {
          condition: this.encodeCondition(this.conditionQuery.condition)
        })
      } else {
        query = Object.assign({}, this.$route.query, this.conditionQuery)
      }

      if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
        this.$router.replace({ query })
      }
    }
  }
}

export { ConditionHandler }
export default ConditionHandler
