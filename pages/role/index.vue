<template>
  <div>
    <a-form-model
      ref="form"
      :model="filters"
      :label-col="{ sm: 6 }"
      :wrapper-col="{ sm: 18 }"
      class="search-form"
      @submit.prevent="search"
    >
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col
          :span="24"
          :md="12"
        >
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
                icon="role"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :md="24"
          class="box-form-footer text-center p-3"
        >
          <a-button
            html-type="submit"
            type="primary"
            class="w-min-100"
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
            class="w-min-100"
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
    <a-button
      type="primary"
      @click="showDetail(0)"
    >
      Create Role
    </a-button>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span
        slot="action"
        slot-scope="record"
      >
        <a-button
          type="success"
          @click="goToDetail(record.id)"
        >
          <font-awesome-icon
            icon="pencil-alt"
            class="width-1x"
          />
        </a-button>
        <a-button
          type="primary"
          @click="showDetail(record.id)"
        >
          <font-awesome-icon
            icon="eye"
            class="width-1x"
          />
        </a-button>
        <a-button
          type="danger"
          @click="confirmToDelete(record.id)"
        >
          <font-awesome-icon
            icon="times"
            class="width-1x"
          />
        </a-button>
      </span>
    </a-table>
    <a-modal
      ref="detail"
      :visible="visible"
      :footer="null"
      class="modal-wrap"
      :title="currentId ? $t('role.role') : $t('role.role')"
    >
      <a-spin :spinning="loading">
        <role-form
          :id="currentId"
          @save="closeDialog(true)"
          @cancel="closeDialog(false)"
        />
      </a-spin>
    </a-modal>
  </div>
</template>
<script>

import DataTable from '~/mixins/data-table'
import RoleForm from '~/components/organisms/RoleForm'

export default {
  components: { RoleForm },
  mixins: [DataTable],
  data() {
    return {
      resource: 'role',
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
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
          width: '20%'
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
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
    showDetail(id) {
      this.currentId = id
      this.visible = true
    },

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

    search() {
      this.replaceQuery(this.filters)
    }
  }
}
</script>
