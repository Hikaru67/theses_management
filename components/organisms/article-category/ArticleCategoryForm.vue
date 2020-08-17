<template>
  <a-form-model
    ref="refForm"
    v-loading="loading"
    :model="model"
    :rules="rulesForm"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 14 }"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <div class="box-form-inner p-4">
      <a-form-model-item :label="$t('category.name')" prop="name">
        <a-input
          v-model="model.name"
          :placeholder="$t('category.name')"
          :disabled="loading"
        >
          <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item :label="$t('category.description')" prop="description">
        <a-textarea
          v-model="model.description"
          :placeholder="$t('category.description')"
          rows="6"
          :disabled="loading"
        />
      </a-form-model-item>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        :disabled="loading"
        class="w-min-100"
      >
        <font-awesome-icon icon="save" class="width-1x mr-1" />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        :disabled="loading"
        class="w-min-100"
        @click="$emit('cancel')"
      >
        <font-awesome-icon icon="arrow-left" class="width-1x mr-1" />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<script>
import Category from '~/models/Category'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm
  ],

  props: {
    /**
     * category curent id
     */
    id: {
      type: Number,
      default: 0
    },

    /**
     * Category parent id
     */
    parentId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      model: new Category(),
      modelType: this.$t('category.category')
    }
  },

  computed: {
    /**
     * Rules form
     *
     * @param {object} - Rules form
     */
    rulesForm() {
      return {
        name: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('category.name') }),
            trigger: ['change', 'blur']
          }
        ],
        description: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('category.description') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  watch: {
    /**
     * Watching changes of id
     * Get detail
     */
    id(val) {
      this.model = new Category()

      if (val) {
        this.getDetail(val)
      }
    },

    /**
     * Watching changes of parentId
     * Set parent Id
     *
     * @param {Number} val - parent Id
     */
    parentId(val) {
      if (val) {
        this.model.parentId = val
      }
    }
  },

  mounted() {
    this.getDetail(this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Category(data)
    },

    /**
     * On handle submit
     * If valid then show error
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (!valid) {
          this.$notification.error({
            message: this.$t('messages.error.input_error')
          })
        } else {
          this.onSubmit()
        }
      })
    }
  }
}
</script>
