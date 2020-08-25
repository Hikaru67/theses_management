<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="rulesForm"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="validateBeforeSubmit"
  >
    <div class="box-form-inner p-4">
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('menu.title')"
            prop="title"
          >
            <a-input
              v-model="model.title"
              :placeholder="$t('menu.title')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="user"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('menu.icon')"
            prop="icon"
          >
            <a-input
              v-model="model.icon"
              :placeholder="$t('menu.icon')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="envelope"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('menu.roles')"
            prop="roles"
          >
            <a-select
              v-model="model.roleIds"
              mode="multiple"
              style="width: 100%"
              placeholder="Please select"
            >
              <a-select-option
                v-for="role in roles"
                :key="role.id"
              >
                {{ role.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        class="w-min-100"
      >
        <font-awesome-icon
          icon="save"
          class="width-1x mr-1"
        />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        class="w-min-100"
        @click="$emit('cancel')"
      >
        <font-awesome-icon
          icon="arrow-left"
          class="width-1x mr-1"
        />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<script>

import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  async fetch() {
    const { data } = await this.$api.indexRole()
    this.roles = data.data
  },

  data: () => ({
    resource: 'menu',
    roles: []
  }),

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
            message: this.$t('messages.error.required', { title: this.$t('menu.title') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  }
}
</script>
