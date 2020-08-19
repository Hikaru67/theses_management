<template>
  <a-form-model
    ref="refForm"
    v-loading.fullscreen="loading"
    :model="model"
    :rules="rulesForm"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <div class="box-form-inner p-4">
      <a-row type="flex" :gutter="30">
        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('menu.title')" prop="title">
            <a-input
              v-model="model.title"
              :placeholder="$t('menu.title')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('menu.link')" prop="link">
            <a-input
              v-model="model.link"
              :placeholder="$t('menu.link')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('menu.icon')" prop="icon">
            <a-input
              v-model="model.icon"
              type="icon"
              :placeholder="$t('menu.icon')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="icons" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('menu.parent_id')" prop="parent_id">
            <a-input
              v-model="model.parent_id"
              type="parent_id"
              :placeholder="$t('menu.parent_id')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="stream" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('menu.position')" prop="position">
            <a-input
              v-model="model.position"
              type="position"
              :placeholder="$t('menu.position')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="list-ol" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
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
import Menu from '~/models/Menu'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new Menu(),
      modelType: this.$t('menu.menu')
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
        title: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('menu.title') }),
            trigger: ['change', 'blur']
          }
        ],
        link: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('menu.link') }),
            trigger: ['change', 'blur']
          }
        ],
        icon: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('menu.icon') }),
            trigger: ['change', 'blur']
          }
        ],
        parent_id: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('menu.parent_id') }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.$validator.numericValidator(this.$t('menu.parent_id')),
            trigger: ['change', 'blur']
          }
        ],
        position: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('menu.position') }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.$validator.numericValidator(this.$t('menu.position')),
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
      this.model = new Menu()

      if (val) {
        this.getDetail(val)
      }
    }
  },

  mounted() {
    this.getDetail(+this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Menu(data)
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
