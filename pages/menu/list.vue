<template>
  <div class="main-list position-relative">
    <div class="box-change-view">
      <nuxt-link
        to="/menu"
        :class="`${$route.path === '/menu/list' ? 'on-menu-list' : ''}`"
      >
        <font-awesome-icon icon="th-list" />
      </nuxt-link>

      <nuxt-link
        to="/menu/list"
        :class="`${$route.path === '/menu/list' ? 'on-menu-list' : ''}`"
      >
        <font-awesome-icon icon="border-all" />
      </nuxt-link>
    </div>

    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="stream" />
        {{ $t('menu.menu_list') }}
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
        class="main-search mb-4"
        @submit.prevent="search"
      >
        <a-row type="flex" :gutter="30">
          <a-col :span="24" :md="12">
            <a-form-model-item :label="$t('menu.title')" prop="title">
              <a-input
                v-model="title"
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
                v-model="link"
                :placeholder="$t('menu.link')"
                :disabled="loading"
              >
                <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
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
              :disabled="loading"
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
              :disabled="loading"
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
      :width="1300"
      :footer="null"
      class="modal-detail"
      @cancel="visible = false"
    >
      <template slot="title">
        <font-awesome-icon :icon="`${currentId ? 'pencil-alt' : 'plus-circle'}`" />
        {{ $t('menu.menu') }}
      </template>

      <a-spin :spinning="loading">
        <menu-form
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
import MenuForm from '~/components/organisms/MenuForm'
import DataTable from '~/mixins/data-table'

export default {
  components: {
    MenuForm
  },

  mixins: [
    DataTable
  ],

  data() {
    return {
      resource: 'menu',
      resourceName: this.$t('menu.menu'),
      visible: false,
      currentId: 0,
      filters: {
        title: this.$route.query.title || '',
        link: this.$route.query.link || ''
      }
    }
  },
  computed: {
    /**
     * Columns
     *
     * @param {array} - Columns
     */
    columns() {
      const columns = [
        {
          dataIndex: 'id',
          title: this.$t('menu.id'),
          width: 60
        },
        {
          dataIndex: 'title',
          title: this.$t('menu.title')
        },
        {
          dataIndex: 'link',
          title: this.$t('menu.link')
        },
        {
          dataIndex: 'icon',
          title: this.$t('menu.icon')
        },
        {
          dataIndex: 'parent_id',
          title: this.$t('menu.parent_id')
        },
        {
          dataIndex: 'position',
          title: this.$t('menu.position')
        },
        {
          dataIndex: 'action',
          title: this.$t('common.action'),
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
     * Clear form search
     */
    reset() {
      this.filters = {
        title: '',
        link: ''
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
