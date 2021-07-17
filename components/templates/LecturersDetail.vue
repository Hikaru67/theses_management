<template>
  <a-spin :spinning="loading">
    <div class="box-form-inner p-5">
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col
          :sm="24"
          class="action__col--fluid"
        >
          <a-row
            type="flex"
            justify="end"
          >
            <a-button
              html-type="button"
              type="danger"
              class="min-w-100"
              shape="round"
              ghost
              @click.stop="confirmToDelete(model.id, model.ten_gv)"
            >
              <font-awesome-icon
                :icon="['far', 'trash-alt']"
                class="width-1x"
              />
              Delete
            </a-button>
          </a-row>
        </a-col>
        <a-col :sm="24">
          <div class="modal__title">
            <span>
              {{ createdDate(model.ceate_date) }}
            </span>
            <h1>
              {{ $t('lecturer.name') }}
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              {{ model.ten_gv }}
            </h1>
          </div>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('lecturer.specialized')"
          >
            <a-input
              v-model="model.khoa"
              class="text-content pl-0"
              :placeholder="$t('lecturer.specialized')"
              disabled
            />
          </a-form-model-item>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('lecturer.address')"
          >
            <a-input
              v-model="model.dia_chi"
              class="text-content pl-0"
              :placeholder="$t('lecturer.address')"
              disabled
            />
          </a-form-model-item>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('lecturer.phone')"
          >
            <a-input
              v-model="model.sdt"
              class="text-content pl-0"
              :placeholder="$t('lecturer.phone')"
              disabled
            />
          </a-form-model-item>
        </a-col>

        <a-col
          :sm="24"
          class="text-center"
        >
          <a-button
            html-type="button"
            type="default"
            class="min-w-100"
            shape="round"
            @click="$emit('cancel')"
          >
            Cancel
          </a-button>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script>
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  data: () => ({
    resource: 'lecturers'
  }),

  methods: {
    createdDate(val) {
      return this.$moment(val).format('YYYY.MM.DD')
    },

    /**
     * Confirm to delete
     *
     * @param {Number} id
     * @param {String} title
     */
    confirmToDelete(id, title) {
      this.$confirm({
        title,
        content: this.$t('text.confirm_to_delete'),
        okText: this.$t('common.delete'),
        okType: 'danger',
        cancelText: this.$t('common.cancel'),
        width: 385,
        onOk: () => this.deleteRecord(id, title)
      })
    },

    /**
     * Delete record
     *
     * @param {Number} id
     * @param {String} title
     */
    async deleteRecord(id, title) {
      try {
        this.$store.dispatch('setLoading', true)
        await this.$api.destroyLecturers({ id })

        this.$notification.success({
          message: <div>
            <span style="color: #2a69be">
              {title}
            </span>
            {this.$t('text.delete_new_success')}
          </div>
        })
      } catch (_) {
        console.warn(_)
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
        this.$emit('save')
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .action__col--fluid {
    padding: 0 40px !important;
  }
  .modal__title {
    margin-top: 40px;
    border-bottom: 1px solid #e8e8e8;
  }
  .modal__content {
    overflow-y: scroll;
    max-height: 400px;
    margin: 40px 0;
    padding-right: 20px;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .ant-col {
    .ant-form-item-label label {
      font-size: 20px;
    }
  }
}
.text-content {
  cursor: default;
  background: white;
  color: black;
  border: none;
  resize: none;
}
.unset-width {
  width: unset;
}
</style>
