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
    <div class="box-form-inner p-4">
      <a-row type="flex" :gutter="30">
        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.title')" prop="title">
            <a-input
              v-model="model.title"
              :placeholder="$t('article.title')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.category')" prop="article_category_id">
            <a-select
              v-model="model.article_category_id"
              :disabled="loading || checkField(true)"
            >
              <a-select-option
                v-for="(item, index) in categoryList"
                :key="index"
                :value="item.id"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.origin_url')" prop="origin_url">
            <a-input
              v-model="model.origin_url"
              :placeholder="$t('article.origin_url')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.site')" prop="site_id">
            <a-select
              v-model="model.site_id"
              :disabled="loading"
            >
              <a-select-option
                v-for="(item, index) in siteList"
                :key="index"
                :value="item.id"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.views')" prop="views">
            <a-input
              v-model="model.views"
              :placeholder="$t('article.views')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="eye" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.status')" prop="status">
            <a-radio-group
              v-model="model.status"
              :options="statusList"
              name="status"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <!-- public start at -->
        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.public_start_at_from')" prop="public_start_at_from">
            <a-date-picker
              v-model="model.public_start_at_from"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="X"
              placeholder="YYYY-MM-DD HH:mm:ss"
              :disabled="loading"
              class="w-100"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.public_start_at_to')" prop="public_start_at_to">
            <a-date-picker
              v-model="model.public_start_at_to"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="X"
              placeholder="YYYY-MM-DD HH:mm:ss"
              :disabled="loading"
              class="w-100"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.youtube_id')" prop="youtube_id">
            <a-input
              v-model="model.youtube_id"
              :placeholder="$t('article.youtube_id')"
              :disabled="loading"
            >
              <svg
                slot="addonBefore"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="youtube"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                class="svg-inline--fa fa-youtube width-1x"
              >
                <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" class="" />
              </svg>
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.youtube_url')" prop="youtube_url">
            <a-input
              v-model="model.youtube_url"
              :placeholder="$t('article.youtube_url')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.type')" prop="type">
            <a-radio-group
              v-model="model.type"
              :options="typeList"
              name="type"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.youtube_views')" prop="youtube_views">
            <a-input
              v-model="model.youtube_views"
              :placeholder="$t('article.youtube_views')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="eye" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.image')" prop="upload_file">
            <a-upload
              v-model="model.upload_files"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              @change="onSelectFile"
            >
              <img
                v-if="model.file && model.file.path"
                :src="`${getImagePath(model.file.path)}`"
                alt="avatar"
              />

              <div v-else>
                <a-icon :type="loadingImage ? 'loading' : 'plus'" />

                <div class="ant-upload-text">
                  {{ $t('common.choose_files_or_drag_and_drop_here') }}
                </div>
              </div>
            </a-upload>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.image') + 'URL'" prop="image_path">
            <a-input
              v-model="model.image_path"
              :placeholder="$t('article.image') + 'URL'"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24">
          <a-form-model-item
            :label="$t('article.admin_note')"
            prop="admin_note"
            :label-col="{ sm: 3 }"
            :wrapper-col="{ sm: 18 }"
          >
            <a-textarea
              v-model="model.admin_note"
              :placeholder="$t('article.admin_note')"
              rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24">
          <a-form-model-item
            :label="$t('article.short_description')"
            prop="short_description"
            :label-col="{ sm: 3 }"
            :wrapper-col="{ sm: 18 }"
          >
            <a-textarea
              v-model="model.short_description"
              :placeholder="$t('article.short_description')"
              rows="3"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col v-if="model.youtube_id" :span="24" :md="24">
          <a-form-model-item
            label=""
            prop="short_description"
            :label-col="{ sm: 3 }"
            :wrapper-col="{ sm: 21 }"
          >
            <iframe
              :src="getLinkVideoYoutube(model)"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video-embed mb-2"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="24">
          <a-form-model-item
            :label="$t('site.description')"
            prop="description"
            :label-col="{ sm: 3 }"
            :wrapper-col="{ sm: 21 }"
          >
            <!-- <ckeditor
              v-model="model.description"
              :editor="editor"
              :config="descriptionConfig"
            /> -->
          </a-form-model-item>
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        :disabled="loading"
        class="w-min-100"
      >
        <font-awesome-icon icon="save" class="width-1x mr-1" />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        :disabled="loading"
        class="w-min-100"
        @click="$emit('cancel')"
      >
        <font-awesome-icon icon="arrow-left" class="width-1x mr-1" />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<script>
import { get } from 'lodash'

import {
  ARTICLE_TYPE,
  ARTICLE_STATUS,
  MAX_LIMIT_RECORD,
  ORIGINAL_CATEGORY_ID
} from '~/constants'

import Article from '~/models/Article'
import CreateEditForm from '~/mixins/create-edit-form'

import uploadPlugin from '~/plugins/ck-editor/upload-plugin'
let ClassicEditor
if (process.browser) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

const TOOLBAR_SETTING = [
  'Heading',
  '|',
  'Bold',
  'Italic',
  'Link',
  'BulletedList',
  'NumberedList',
  '|',
  'Outdent',
  'Indent',
  '|',
  'Blockquote',
  'Undo',
  'Redo'
]

export default {
  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new Article(),
      modelType: this.$t('article.article'),
      uploadFiles: [],
      imageList: [],
      isHidden: false,
      categories: [],
      sites: [],
      isCategoryDisabled: false,
      loadingImage: false,

      // CKeditor
      editor: ClassicEditor,
      editorData: '',
      descriptionConfig: {
        placeholder: this.$t('article.description'),
        extraPlugins: [editor => uploadPlugin(editor, this.uploadFn.bind(this))]
      },
      shortDescriptionConfig: {
        placeholder: this.$t('article.short_description'),
        toolbar: TOOLBAR_SETTING
      }
    }
  },

  computed: {
    /**
     * Rules form
     *
     * @param {object} - Rules form
     */
    rulesForm() {
      return {
        title: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('article.title') }),
            trigger: ['change', 'blur']
          }
        ],

        public_start_at_from: [
          {
            validator: this.validateRangePublicStartAt,
            trigger: ['change', 'blur']
          }
        ],

        public_start_at_to: [
          {
            validator: this.validateRangePublicStartAt,
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    /**
     * Check origin category
     *
     */
    isOriginCategory() {
      return this.model.article_category_id && (this.model.article_category_id === ORIGINAL_CATEGORY_ID)
    },

    /**
     * Return list category item options
     *
     * @return {Array} Category list
     */
    categoryList() {
      if (!(Array.isArray(this.categories) && this.categories.length)) {
        return []
      }

      const optionPlaceholder = {
        id: -1,
        label: this.$t('common.option_please_select')
      }

      const list = this.categories.map(item => {
        return {
          id: item.id,
          label: item.name
        }
      })

      if (this.id === 0) {
        const originalCategory = list.find(item => item.id === ORIGINAL_CATEGORY_ID)
        list.length = 0
        list.push(originalCategory)
      }

      return [optionPlaceholder].concat(list)
    },

    /**
     * Return list site item options
     *
     * @return {Array} Site list
     */
    siteList() {
      if (!(Array.isArray(this.sites) && this.sites.length)) {
        return []
      }

      const optionPlaceholder = {
        id: -1,
        label: this.$t('common.option_please_select')
      }

      const list = this.sites.map(item => {
        return {
          id: item.id,
          label: item.name
        }
      })

      return [optionPlaceholder].concat(list)
    },

    /**
     * Get Status list
     *
     * @return {Array} Status list
     */
    statusList() {
      return ARTICLE_STATUS.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })
    },

    /**
     * Get Type list
     *
     * @return {Array} Type list
     */
    typeList() {
      return ARTICLE_TYPE.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })
    },

    /**
     * Check has image
     *
     */
    hasImage() {
      const hasImage =
        (this.uploadFiles && this.uploadFiles.length) || (this.model.images && this.model.images.length)
          ? this.uploadFiles.length
          : null

      return (this.id === 0 || this.model.article_category_id === ORIGINAL_CATEGORY_ID)
        ? hasImage
        : this.model.image_path
          ? 1
          : hasImage
    }
  },

  watch: {
    /**
     * Watching changes of id
     * Get detail
     */
    id(val) {
      this.model = new Article()

      if (val) {
        this.getDetail(val)
      }
    },

    /**
     * Watching changes of uploadFiles
     */
    uploadFiles: {
      handler(val) {
        if (val) {
          this.model.upload_files = val.map(item => item.file)
          this.model.images = this.imageList.map(el => {
            return el.id
          })
        }
      }
    },

    /**
     * Check link url for get youtube ids
     *
     * @param {String} val - Link url
     */
    'model.youtube_url': {
      handler(val) {
        let youtubeID = ''

        if (val) {
          const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?]*).*/
          const parsed = val.match(youtubeRegex)

          if (parsed && parsed[2]) {
            youtubeID = parsed[2]
          }
        }

        this.model.youtube_id = youtubeID
      }
    }
  },

  mounted() {
    this.getCategoryList()
    this.getSiteList()
    this.getDetail(+this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Article(data)
      this.imageList = this.model.images
      this.model.public_start_at = this.setDateValue(this.model.public_start_at)
      this.model.public_end_at = this.setDateValue(this.model.public_end_at)
      this.model.create_origin_at = this.setDateValue(this.model.create_origin_at)
      this.model.update_origin_at = this.setDateValue(this.model.update_origin_at)
      this.model.last_crawl_at = this.setDateValue(this.model.last_crawl_at)
      if (!this.model.short_description) { this.model.short_description = '' }
      if (!this.model.description) { this.model.description = '' }
      if (this.id === 0) {
        this.model.article_category_id = ORIGINAL_CATEGORY_ID
      }
    },

    /**
     * Call API get category list
     */
    getCategoryList() {
      this.$dam.getArticleCategoryList({ limit: MAX_LIMIT_RECORD })
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.categories = res.data
          }
        })
        .catch(err => {
          console.error(err)

          this.$toast.error(
            this.$t('messages.error.failed_to_get', { name: this.$t('category.category') })
          )
        })
    },

    /**
     * Call API get site list
     */
    getSiteList() {
      this.$dam.getSiteList({ limit: MAX_LIMIT_RECORD })
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.sites = res.data
          }
        })
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.$t('site.list_site') })
          })
        })
    },

    /**
     * Get link video youtube
     *
     * @param {Object} item
     */
    getLinkVideoYoutube(item) {
      if (item.youtube_id) {
        return 'https://www.youtube.com/embed/' + item.youtube_id
      }

      return ''
    },

    /**
     * Get image
     */
    getImagePath(imagePath) {
      return /(http(s?)):\/\//i.test(imagePath) ? imagePath : process.env.dam.baseImageURL + imagePath
    },

    /**
     * On select file
     */
    onSelectFile() {
      this.model.upload_files.concat(this.uploadFiles)
    },

    /**
     * Set date value
     */
    setDateValue(date) {
      return date === 0 ? null : date * 1000
    },

    /**
     * Check before submỉt
     */
    onCheck() {
      if (!this.uploadFiles.length) {
        if (this.model.images && this.model.images.length) {
          this.model.images = this.imageList.map(el => {
            return el.id
          })
        }
      }
    },

    /**
     * Upload function
     *
     * @param {File} file
     * @return {String} upload path
     */
    async uploadFn(file) {
      try {
        const data = new FormData()
        data.append('upload_file', file)
        const res = await this.$dam.uploadFile({ _data: data })

        return get(res, 'data.path', '')
      } catch (err) {
        throw new Error(err)
      }
    },

    /**
     * Delete image
     */
    deleteImage(imageId) {
      this.imageList = this.imageList.filter(image => image.id !== imageId)
    },

    /**
     * show or hide field
     */
    checkField(isOriginalField) {
      return true
      // return this.id === 0
      //   ? isOriginalField
      //   : this.model.article_category_id === ORIGINAL_CATEGORY_ID
      //     ? isOriginalField
      //     : !isOriginalField
    },

    /**
     * Validate range public start at
     *
     * @param {Object} rule - Rule of validation
     * @param {String} value - Value of input
     * @param {Function} callback - Callback function
     */
    validateRangePublicStartAt(rule, value, callback) {
      const from = this.public_start_at_from ? +this.public_start_at_from : null
      const to = this.public_start_at_to ? +this.public_start_at_to : null

      if ((to < from) || (from && !to) || (!from && to)) {
        return callback(
          new Error(
            this.$t('messages.error.date_before', {
              name: this.$t('article.public_start_at_from'),
              target: this.$t('article.public_start_at_to')
            })
          )
        )
      } else {
        if (rule.field === 'public_start_at_from') {
          this.$refs.refForm.clearValidate('public_start_at_to')
        } else {
          this.$refs.refForm.clearValidate('public_start_at_from')
        }

        return callback()
      }
    },

    /**
     * On handle submit
     * If valid then show error
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (!valid) {
          this.$notification.error({
            message: this.$t('messages.error.input_error')
          })
        } else {
          this.onSubmit()
        }
      })
    }
  }
}
</script>
