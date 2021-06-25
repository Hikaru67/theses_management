<template>
  <a-spin :spinning="loading">
    <div class="box-form-inner p-4">
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col :sm="24">
          {{ model.area }}
        </a-col>
        <a-col :sm="24">
          {{ model.title }}
        </a-col>
        <a-col :sm="24">
          {{ model.content }}
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="button"
        type="default"
        class="min-w-100"
        @click="$emit('cancel')"
      >
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script>
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  data: () => ({
    resource: 'user'
  })
}
</script>
