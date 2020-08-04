<template>
  <a-form-model
    ref="refForm"
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
        <!-- v-if="Array.isArray(nestedPermissions) && nestedPermissions.length" -->
        <a-collapse
          v-model="activeCollapseKeys"
          expand-icon-position="right"
        >
          <a-collapse-panel
            v-for="item in nestedPermissions"
            :key="item.id"
            :header="item.name"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptatum similique iure! Adipisci voluptatibus aliquid numquam. Nostrum numquam minima error quo rem eveniet cumque accusamus enim, voluptas eum dolore vel.
            {{ item.children }}
            <!-- <app-checkbox-group
              :value="model.permissions"
              :list="item.children"
              :name="'permissions'"
              :inline="false"
              @toggle="updatePermissions"
            /> -->
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

// import AppCheckboxGroup from '~/components/atoms/AppCheckboxGroup'

import CreateEditForm from '~/mixins/create-edit-form'

const MOCK_PER = {
  data: [
    {
      id: 1,
      name: 'role.index'
    },
    {
      id: 2,
      name: 'role.store'
    },
    {
      id: 3,
      name: 'role.show'
    },
    {
      id: 4,
      name: 'role.update'
    },
    {
      id: 5,
      name: 'role.delete'
    },
    {
      id: 6,
      name: 'user.index'
    },
    {
      id: 7,
      name: 'user.store'
    },
    {
      id: 8,
      name: 'user.show'
    },
    {
      id: 9,
      name: 'user.update'
    },
    {
      id: 10,
      name: 'user.delete'
    },
    {
      id: 11,
      name: 'menu.index'
    },
    {
      id: 12,
      name: 'menu.store'
    },
    {
      id: 13,
      name: 'menu.show'
    },
    {
      id: 14,
      name: 'menu.update'
    },
    {
      id: 15,
      name: 'menu.delete'
    }
  ]
}

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
      // this.$dam.getPermission()
      //   .then(res => {
      //     this.permissions = res.data.map(item => new Permission(item))

      //     const parents = [...new Set(res.data.map(item => item.name.split('.')[0]))]
      //     const permissions = []
      //     let i = 0

      //     parents.forEach(entry => {
      //       permissions.push({
      //         id: --i,
      //         name: `${entry}.module`,
      //         parent_id: 0
      //       })
      //       this.permissions.forEach((item, index) => {
      //         if (item.name.startsWith(`${entry}.`)) {
      //           this.permissions[index].parent_id = i
      //         }
      //       })
      //     })

      //     this.permissions = [...permissions, ...this.permissions]
      //   })
      //   .catch(_ => {
      //     this.$toast.error(
      //       this.$t('messages.error.failed_to_get', { name: this.$t('role.permissions') })
      //     )
      //   })
      // TODO
      this.permissions = MOCK_PER.data.map(item => new Permission(item))

      const parents = [...new Set(MOCK_PER.data.map(item => item.name.split('.')[0]))]
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
            name: this.$t(`permissions.${item.name}`)
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
    }
  }
}
</script>
