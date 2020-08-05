<template>
  <a-form-model
    ref="refForm"
    v-loading="loading"
    :model="model"
    :rules="rulesForm"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <a-form-model-item :label="$t('role.name')" prop="name">
      <a-input
        v-model="model.name"
        :placeholder="$t('role.name')"
        :disabled="loading"
      >
        <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
      </a-input>
    </a-form-model-item>

    <div class="ant-row ant-form-item">
      <div class="ant-col ant-col-sm-6 ant-form-item-label">
        <label>{{ $t('role.permissions') }}</label>
      </div>

      <div class="ant-col ant-col-sm-18 ant-form-item-control-wrapper">
        <a-collapse
          v-if="Array.isArray(nestedPermissions) && nestedPermissions.length"
          v-model="activeCollapseKeys"
          expand-icon-position="right"
        >
          <a-collapse-panel
            v-for="item in nestedPermissions"
            :key="`${item.id}`"
            :header="item.name"
          >
            <a-checkbox-group
              :value="model.permissions"
              :options="item.children"
              name="permissions"
              :disabled="loading"
              class="no-inline"
              @change="updatePermissions"
            />
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>

    <div class="box-form-footer py-3">
      <a-button
        html-type="submit"
        type="primary"
        :disabled="loading"
      >
        <font-awesome-icon icon="save" class="width-1x mr-1" />
        {{ $t('common.save') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        :disabled="loading"
        @click="onCancel"
      >
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
@import '~/assets/scss/_mixins.scss';

.main-form {
  /deep/ {
    max-width: 900px;
    margin: auto;
    @include mq(max_lg) {
      max-width: 100%;
    }
    .ant-form-item-label {
      text-align: left;
    }
    .box-permission-list {
      .card {
        overflow: hidden;
        margin-bottom: 5px;
      }
      .card-header {
        cursor: pointer;
        border-bottom: 0;
      }
      .card-body {
        border-top: 1px solid #d8dbe0;
      }
    }
    .box-form-footer {
      text-align: center;
      .ant-btn {
        min-width: 100px;
      }
    }
  }
}
</style>

<script>
import { xor } from 'lodash'

import Role from '~/models/Role'
import Permission from '~/models/Permission'

// import AppCheckboxGroup from '~/components/molecules/AppCheckboxGroup'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  components: {
    // AppCheckboxGroup
  },

  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new Role(),
      modelType: this.$t('role.role'),
      permissions: [],
      activeCollapseKeys: []
    }
  },

  computed: {
    /**
     * Rules form
     *
     * @param {array} - Rules form
     */
    rulesForm() {
      return {
        name: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('role.name') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    nestedPermissions() {
      return this.convertPermissions()
    }
  },

  watch: {
    /**
     * Watching changes of id
     * Get detail
     */
    id(val) {
      this.getDetail(val)
    }
  },

  mounted() {
    this.prepareData()
  },

  methods: {
    /**
     * Cancel
     */
    onCancel() {
      this.$emit('cancel')
    },

    /**
     * Dynamic set model
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Role(data)
    },

    /**
     * Prepare master data
     */
    prepareData() {
      this.$dam.getPermission()
        .then(res => {
          this.permissions = res.data.map(item => new Permission(item))

          const parents = [...new Set(res.data.map(item => item.name.split('.')[0]))]
          const permissions = []
          let i = 0

          parents.forEach(entry => {
            permissions.push({
              id: --i,
              name: `${entry}.module`,
              parent_id: 0
            })
            this.permissions.forEach((item, index) => {
              if (item.name.startsWith(`${entry}.`)) {
                this.permissions[index].parent_id = i
              }
            })
          })

          this.permissions = [...permissions, ...this.permissions]
        })
        .catch(_ => {
          this.$toast.error(
            this.$t('messages.error.failed_to_get', { name: this.$t('role.permissions') })
          )
        })
    },

    /**
     * Convert permissions to nested
     *
     * @param {Number} parentId
     * @return {Array} permissions
     */
    convertPermissions(parentId = 0) {
      return this.permissions
        .filter(item => item.parent_id === parentId)
        .map(item => {
          return {
            ...item,
            children: this.convertPermissions(item.id),
            label: this.$t(`permissions.${item.name}`),
            value: item.id
          }
        })
    },

    /**
     * Update permission
     * @param {Object} data
     */
    updatePermissions(data) {
      const idList = this.model.permissions.map(item => item.id)
      const checkedIds = xor(idList, [data.id])

      this.model.permissions = this.permissions.filter(item => checkedIds.includes(item.id))
      let parentPermission = this.model.permissions.map(item => item.parent_id)

      if (parentPermission && parentPermission.length) {
        parentPermission = parentPermission.reduce(
          (accumulator, currentItem) => accumulator.includes(currentItem) ? accumulator : [...accumulator, currentItem],
          []
        )
      }

      this.permissions.filter(item => {
        if (
          item.id > 0 &&
          parentPermission.includes(item.id) &&
          !this.model.permissions.includes(item)
        ) {
          this.model.permissions.push(item)
        }
      })
    },

    /**
     * On handle submit
     * If valid then show error
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.onSubmit()
        }
      })
    }
  }
}
</script>
