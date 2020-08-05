<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <CForm
      v-loading="loading"
      class="main-form form-2-col"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <CCardBody>
        <div class="category-inner-form">
          <div class="row">
            <div class="col-12 col-xl-10">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="name"
                class="icon-required"
              >
                <CInput
                  v-model="model.name"
                  type="text"
                  :label="$t('category.name')"
                  :placeholder="$t('category.name')"
                  horizontal
                >
                  <template #prepend-content>
                    <font-awesome-icon :icon="['fas', 'user-alt']" class="width-1x" />
                  </template>

                  <template #invalid-feedback>
                    <div class="d-block invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </template>
                </CInput>
              </ValidationProvider>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-xl-10">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Description"
                class="icon-required"
              >
                <CTextarea
                  v-model="model.description"
                  type="text"
                  :label="$t('category.description')"
                  :placeholder="$t('category.description')"
                  horizontal
                  rows="5"
                  class="custom-prepend-textarea"
                >
                  <template #invalid-feedback>
                    <div class="d-block invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </template>
                </CTextarea>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </CCardBody>

      <CCardFooter>
        <CButton type="submit" color="primary">
          <font-awesome-icon :icon="['fas', 'save']" class="width-1x" />
          {{ id ? $t('common.update') : $t('common.create') }}
        </CButton>

        <CButton color="secondary" @click="$emit('cancel')">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="width-1x" />
          {{ $t('common.cancel') }}
        </CButton>
      </CCardFooter>
    </CForm>
  </ValidationObserver>
</template>

<script>
import Category from '~/models/Category'
import 'vue2-datepicker/index.css'

import Common from '~/mixins/common'
import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm,
    Common
  ],

  props: {
    /**
     *category parent id
     */
    parentId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      rePassword: null,
      model: new Category(),
      modelType: 'category'
    }
  },

  watch: {
    /**
     * Set parent Id
     *
     * @param {Number} val - parent Id
     */
    'parentId'(val) {
      this.model.parentId = val
    }
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      if (data) {
        this.model = new Category(data)
      }
    },

    /**
     * Prepare data
     */
    prepareData() {
      this.getDetail(this.id)
    },

    /**
     * Clear form data
     */
    clearForm() {
      this.model = new Category()
    }
  }
}
</script>
