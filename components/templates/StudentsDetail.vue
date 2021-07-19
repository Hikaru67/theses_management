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
              @click.stop="confirmToDelete(model.id, model.name)"
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
              {{ createdDate(model.created_at) }}
            </span>
            <h1>
              {{ $t('student.name') }}
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              {{ model.name }}
            </h1>
          </div>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('student.specialized')"
          >
            {{ getSpecialized(model.specialized) }}
          </a-form-model-item>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('student.address')"
          >
            {{ model.address }}
          </a-form-model-item>
        </a-col>

        <a-col :sm="24">
          <a-form-model-item
            class="mb-0"
            :label="$t('student.phone')"
          >
            {{ model.phone }}
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

const SPECIALIZED = [
  'ATTT',
  'CNTT',
  'DTVT'
]

export default {
  mixins: [DataForm],

  data: () => ({
    resource: 'students'
  }),

  methods: {
    /**
     * get specialized
     */
    getSpecialized(specialized) {
      return SPECIALIZED[specialized]
    },

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
        await this.$api.destroyStudents({ id })

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
