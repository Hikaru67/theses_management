<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="box-form-inner p-4">
        <a-row
          type="flex"
          :gutter="30"
        >
          <template v-if="isDraft">
            <a-col
              :md="16"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('themis.name')"
                prop="name"
              >
                <a-input
                  v-model="model.name"
                  :placeholder="$t('themis.name')"
                />
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              {{ model.student_id }}
              <a-form-model-item
                :label="$t('student.name')"
                prop="student"
              >
                <a-select
                  v-model="model.student_id"
                  show-search
                  class="w-100"
                >
                  <a-select-option
                    v-for="item in students"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('lecturer.name')"
                prop="lecturer"
              >
                <a-select
                  v-model="model.lecturer_id"
                  :default-value="lecturers[0]"
                  class="w-100"
                >
                  <a-select-option
                    v-for="item in lecturers"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :md="6">
              <a-upload
                name="file"
                :multiple="true"
                :headers="headers"
                @change="handleChange"
              >
                <a-button>
                  <a-icon type="upload" /> Click to Upload
                </a-button>
              </a-upload>
            </a-col>

            <a-col :sm="24">
              <a-form-model-item
                :label="$t('themis.description')"
                prop="description"
                class="mt-1"
              >
                <a-textarea
                  v-model="model.description"
                  :placeholder="$t('themis.description')"
                  :rows="16"
                />
              </a-form-model-item>
            </a-col>
          </template>
        </a-row>
      </div>

      <div class="box-form-footer text-center p-3">
        <a-button
          html-type="button"
          type="default"
          class="min-w-100"
          shape="round"
          @click="onCancel"
        >
          {{ $t('common.cancel') }}
        </a-button>
        &nbsp;
        <a-button
          html-type="submit"
          type="primary btn-create"
          class="min-w-100"
          shape="round"
        >
          {{ id ? $t('common.update') : $t('common.create') }}
        </a-button>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import { Theses } from '~/store/theses'
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  async fetch() {
    this.$store.dispatch('setLoading', true)
    try {
      let { data } = await this.$api.getListLecturers()
      this.lecturers = [
        ...data
      ]
      data = await this.$api.getListStudents()
      this.students = [
        ...data.data
      ]
    } catch (_) {
      this.$notification.error({
        message: this.$t('text.something_wrong')
      })
    } finally {
      this.$store.dispatch('setLoading', false)
    }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    headers: {
      authorization: 'authorization-text'
    },
    resource: 'theses',
    isDraft: true,
    lecturers: [],
    students: [],
    isUpdateFile: false
  }),

  computed: {
    formRules() {
      return {
        name: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ],
        description: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    currentDate() {
      return this.$moment().format('YYYY.MM.DD')
    },

    curentLecturer() {
      const gv = this.lecturers.find(item => item.id === this.model.lecturer_id)
      return gv.name || ''
    }
  },

  watch: {
    visible(val) {
      if (!val) {
        this.model = new Theses({})
        this.$refs.form.clearValidate()
      }
    }
  },

  methods: {
    /**
     * Handle on cancel
     */
    onCancel() {
      if (this.isDraft) {
        this.$emit('cancel')
        return
      }
      this.isDraft = true
    },

    /**
     * Handle on upload file
     */
    handleChange(info) {
      this.model.attaches = info.fileList
      if (info.fileList.length > 0) {
        this.isUpdateFile = true
      }
    },

    /**
     * Validate before submit
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.$store.dispatch('setLoading', true)
            const action = `${this.resource}/saveModel`
            if (!this.isUpdateFile) {
              this.model.attaches = ''
            }
            await this.$store.dispatch(action, this.model)

            this.isDraft = true
            this.$emit('save', this.model.name)
            this.model = new Theses({})
          } catch (_) {
            this.$notification.error({
              message: this.$t('text.something_wrong')
            })
          } finally {
            this.$store.dispatch('setLoading', false)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
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
.btn-create {
  border: none;
  background-color: #ababb3 !important;
  color: black;
}
.text-content {
  cursor: default;
  background: white;
  color: black;
  border: none;
  resize: none;
}
.label-required {
  background-color: red;
  padding: 0px 7px 1px 6px;
  color: white;
}
</style>
