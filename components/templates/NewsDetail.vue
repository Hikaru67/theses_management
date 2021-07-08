<template>
  <a-spin :spinning="loading">
    <div class="box-form-inner p-4">
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
              ghost
              @click.stop="confirmToDelete(model.id, model.title)"
            >
              <font-awesome-icon
                icon="trash-alt"
                class="width-1x"
              />
              削除
            </a-button>
          </a-row>
        </a-col>

        <a-col :sm="24">
          <div class="modal__title">
            <span>
              {{ createdDate(model.news_created_on) }}
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              配信エリア: {{ model.city.name ? model.city.name : 'すべて' }}
            </span>
            <h1>{{ model.title }}</h1>
          </div>
        </a-col>

        <a-col :sm="24">
          <div class="modal__content">
            {{ model.content }}
          </div>
        </a-col>

        <a-col
          :sm="24"
          class="text-center"
        >
          <a-button
            html-type="button"
            type="default"
            class="min-w-100"
            @click="$emit('cancel')"
          >
            戻る
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
    resource: 'news'
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
        title: title + this.$t('text.confirm_to_delete'),
        okText: this.$t('common.delete'),
        okType: 'danger',
        cancelText: this.$t('common.cancel'),
        onOk: () => this.deleteRecord(id)
      })
    },

    /**
     * Delete record
     *
     * @param {Number} id
     */
    async deleteRecord(id) {
      try {
        this.$store.dispatch('setLoading', true)
        await this.$api.destroyNews({ id })

        this.$notification.success({
          message: this.$t('text.successfully')
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
}
</style>
