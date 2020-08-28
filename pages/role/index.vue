<template>
  <div class="main-list">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="balance-scale" />
        {{ $t('role.role_list') }}
      </template>

      <template slot="extra">
        <a-button html-type="button" type="primary" ghost @click="showDetail(0)">
          <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
          {{ $t('common.create_new') }}
        </a-button>
      </template>

      <a-form-model
        ref="form"
        :model="filters"
        :label-col="{ sm: 6 }"
        :wrapper-col="{ sm: 18 }"
        class="main-search mb-4 max-w-900"
        @submit.prevent="search"
      >
        <a-row
          type="flex"
          :gutter="30"
        >
          <a-col :span="24" :md="21">
            <a-form-model-item
              :label="$t('role.name')"
              prop="name"
            >
              <a-input
                v-model="filters.name"
                :placeholder="$t('role.name')"
              >
                <font-awesome-icon
                  slot="addonBefore"
                  icon="balance-scale"
                  class="width-1x"
                />
              </a-input>
            </a-form-model-item>
          </a-col>

          <a-col
            :md="24"
            class="text-center"
          >
            <a-button
              html-type="submit"
              type="primary"
              class="min-w-100"
            >
              <font-awesome-icon
                icon="search"
                class="width-1x mr-1"
              />
              {{ $t('common.search') }}
            </a-button>

            &nbsp;
            <a-button
              html-type="button"
              type="default"
              class="min-w-100"
              @click="reset"
            >
              <font-awesome-icon
                icon="eraser"
                class="width-1x mr-1"
              />
              {{ $t('common.clear') }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <!-- end main-search -->

      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        class="main-table"
        @change="handleTableChange"
      >
        <template
          slot="action"
          slot-scope="text, record"
        >
          <a-button
            html-type="button"
            type="primary"
            size="small"
            :disabled="loading"
            @click="goToDetail(record.id)"
          >
            <font-awesome-icon icon="eye" class="width-1x" />
          </a-button>

          <a-button
            html-type="button"
            type="primary"
            size="small"
            :disabled="loading"
            @click="showDetail(record.id)"
          >
            <font-awesome-icon icon="pencil-alt" class="width-1x" />
          </a-button>

          <a-button
            html-type="button"
            type="danger"
            size="small"
            :disabled="loading"
            @click="confirmToDelete(record.id)"
          >
            <font-awesome-icon icon="trash-alt" class="width-1x" />
          </a-button>
        </template>
      </a-table>
      <!-- end main-table -->
    </a-card>

    <a-modal
      ref="detail"
      :visible="visible"
      :width="900"
      :footer="null"
      class="modal-detail"
      @cancel="visible = false"
    >
      <template slot="title">
        <font-awesome-icon :icon="`${currentId ? 'pencil-alt' : 'plus-circle'}`" />
        {{ $t('role.role') }}
      </template>

      <a-spin :spinning="loading">
        <role-form
          :id="currentId"
          @save="closeDialog(true)"
          @cancel="closeDialog(false)"
        />
      </a-spin>
    </a-modal>
    <!-- end modal-detail -->
  </div>
</template>
<script>

import DataTable from '~/mixins/data-table'
import RoleForm from '~/components/organisms/RoleForm'

export default {
  components: {
    RoleForm
  },

  mixins: [
    DataTable
  ],

  data() {
    return {
      resource: 'role',
      resourceName: this.$t('role.role'),
      visible: false,
      currentId: 0,
      filters: {
        name: this.$route.query.name || ''
      }
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 60
        },
        {
          title: this.$t('role.name'),
          dataIndex: 'name',
          sorter: true
        },
        {
          title: this.$t('common.action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 140
        }
      ]

      columns.forEach(item => {
        if (this.$route.query.sortField === item.dataIndex) {
          item.sortOrder = this.$route.query.sortOrder
        }
      })

      return columns
    }
  },

  methods: {
    /**
     * Show detail
     *
     * @param {number} id - Item Id
     */
    showDetail(id) {
      this.currentId = id
      this.visible = true
    },

    /**
     * Close dialog
     *
     * @param {boolean} fetch - fetch status
     */
    closeDialog(fetch) {
      this.visible = false
      if (fetch) {
        this.$fetch()
      }
    },

    /**
     * On clear form search
     */
    reset() {
      this.filters = {
        name: ''
      }
    },

    /**
     * Search data
     */
    search() {
      this.replaceQuery(this.filters)
    }
  }
}
</script>
