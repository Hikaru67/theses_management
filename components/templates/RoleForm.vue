<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <div class="box-form-inner p-4">
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col
          :span="24"
          :md="20"
        >
          <a-form-model-item
            :label="$t('role.name')"
            prop="name"
          >
            <a-input
              v-model="model.name"
              :placeholder="$t('role.name')"
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
          :md="20"
        >
          <a-form-model-item
            :label="$t('role.permissions')"
            prop="permissions"
          >
            <a-checkbox-group
              v-model="model.permissionIds"
              name="permissions"
              class="no-inline"
            >
              <a-collapse
                v-if="permissions.length"
                expand-icon-position="right"
              >
                <a-collapse-panel
                  v-for="group in permissions"
                  :key="`${group.name}`"
                  :header="group.name"
                >
                  <a-checkbox
                    v-for="permission in group.permissions"
                    :key="permission.id"
                    :value="permission.id"
                  >
                    {{ permission.name }}
                  </a-checkbox>
                </a-collapse-panel>
              </a-collapse>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        class="min-w-100"
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
        class="min-w-100"
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
    const { data } = await this.$api.getPermission()
    const parents = [...new Set(data.data.map(item => item.name.split('.')[0]))]

    this.permissions = parents.map(entry => {
      return {
        name: `${entry}.module`,
        permissions: data.data.filter((item, index) => item.name.startsWith(`${entry}.`))
      }
    })
  },

  data: () => ({
    resource: 'role',
    permissions: []
  }),

  computed: {
    formRules() {
      return {
        name: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('role.name') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  }
}
</script>
