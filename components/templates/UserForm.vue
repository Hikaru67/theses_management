<template>
  <a-form-model
    ref="form"
    :model="model"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="box-form-inner p-4">
        <table class="table table-bordered">
          <tr>
            <th rowspan="4">
              <div
                class="center"
                style="height: 565px;"
              >
                ユーザー情報
              </div>
            </th>
            <td style="width: 120px;">
              <div class="row ml-1">
                <div
                  class="center"
                  style="height: 110px;"
                >
                  お名前
                  &nbsp;
                </div>
              </div>
            </td>
            <td>
              <div class="row mx-4">
                <a-col span="12">
                  <span>姓</span>
                  <p>{{ model.user_kanji_surname }}</p>
                </a-col>
                <a-col span="12">
                  <span>名</span>
                  <p>{{ model.user_kanji_name }}</p>
                </a-col>
              </div>
              <div class="row mx-4">
                <a-col span="12">
                  <span>セイ</span>
                  <p>{{ model.user_katakana_surname }}</p>
                </a-col>
                <a-col span="12">
                  <span>メイ</span>
                  <p>{{ model.user_katakana_name }}</p>
                </a-col>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="row ml-1">
                <div
                  class="center"
                  style="height: 40px;"
                >
                  生年月日
                  &nbsp;
                </div>
              </div>
            </td>
            <td>
              <div class="row mx-4">
                <div
                  class="center"
                  style="height: 40px;"
                >
                  {{ (+model.user_birthday * 1000) | date('YYYY年MM月DD日') }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="row ml-1">
                <div
                  class="center"
                  style="height: 225px;"
                >
                  住所
                  &nbsp;
                </div>
              </div>
            </td>
            <td>
              <div class="mx-4">
                <span>郵便番号</span>
                <p>{{ model.user_postal_code }}</p>
              </div>
              <div class="mx-4">
                <span>都道府県</span>
                <p>{{ model.town }}</p>
              </div>
              <div class="mx-4">
                <span>市区町村</span>
                <p>{{ model.city }}</p>
              </div>
              <div class="mx-4">
                <span>番地以降</span>
                <p>{{ model.district }}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="row ml-1">
                <div
                  class="center mx-0"
                  style="height: 110px;"
                >
                  連絡先
                </div>
              </div>
            </td>
            <td>
              <div class="mx-4">
                <span>電話番号</span>
                <p>{{ model.user_phone_number }}</p>
              </div>
              <div class="mx-4">
                <span>メールアドレス</span>
                <p>{{ model.user_mail_address }}</p>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div
                class="center"
                style="height: 350px;"
              >
                プロフィール
              </div>
            </th>
            <td
              class="profile"
              colspan="2"
            >
              <div class="row">
                <a-col span="5" />
                <a-col span="15">
                  <div class="ctn-avt">
                    <div class="avt">
                      <img
                        class="avatar"
                        :src="model.user_avatar"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <span>ニックネーム</span>
                    <p>{{ model.user_nick_name }}</p>
                  </div>
                  <div>
                    <span>症状を選択</span>
                    <div class="row mx-0">
                      <a-col
                        v-for="symptom in model.symptoms"
                        :key="symptom.id"
                        span="6"
                      >
                        <p>{{ symptom.name }}</p>
                      </a-col>
                    </div>
                  </div>
                  <div>
                    <span>紹介文</span>
                    <p>{{ model.user_bio }}</p>
                  </div>
                </a-col>
                <a-col span="5" />
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="box-form-footer text-center bt-1 p-3">
        <a-button
          html-type="button"
          type="default"
          class="min-w-100"
          @click="$emit('cancel')"
        >
          戻る
        </a-button>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  data: () => ({
    resource: 'users'
  }),

  methods: {
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .ant-modal-title {
    color: #362f0a !important;
  }
}

th {
  background: #f2f1e7;
  text-align: center;
}
span {
  color: #867d50;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.ctn-avt {
  .avt {
    max-width: 200px;
    text-align: center;
    position: relative;
    width: 100%;
    margin: auto;
    .avatar {
      object-fit: cover;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      width: 100%;
    }
    .btn-upload {
      background: white !important;
      color: black;
      border: 1px solid;
      border-radius: 50%;
      position: absolute;
      top: 80%;
      left: 70%;
    }
  }
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  td,
  th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }
  tbody + tbody {
    border-top: 2px solid #dee2e6;
  }
  .table {
    background-color: #fff;
  }
  td .column-2 {
    max-width: 100px !important;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.table-bordered {
  border: 1px solid #dee2e6;
  td,
  th {
    border: 1px solid #dee2e6;
  }
  thead td,
  thead th {
    border-bottom-width: 2px;
  }
}

.rectangle {
  width: 44px;
  height: 21px;
  color: white;
  background: red;
}
</style>
