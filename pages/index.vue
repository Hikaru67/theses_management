<template>
  <div class="box-overview">
    <a-row
      type="flex"
      :gutter="30"
      class="list"
    >
      <a-col
        :span="24"
        :sm="12"
        :lg="6"
        class="item item-green mb-3"
      >
        <div class="box-item">
          <div class="box-detail">
            <a-row
              type="flex"
              :gutter="30"
            >
              <a-col flex="auto">
                <div class="txt-number">
                  10
                </div>
                <div class="txt-title">
                  A
                </div>
              </a-col>
              <a-col>
                <font-awesome-icon
                  :icon="['fas', 'wine-bottle']"
                  class="ic-top"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>

      <a-col
        :span="24"
        :sm="12"
        :lg="6"
        class="item item-blue mb-3"
      >
        <div class="box-item">
          <div class="box-detail">
            <a-row
              type="flex"
              :gutter="30"
            >
              <a-col flex="auto">
                <div class="txt-number">
                  10
                </div>
                <div class="txt-title">
                  B
                </div>
              </a-col>
              <a-col>
                <font-awesome-icon
                  :icon="['fas', 'user-friends']"
                  class="ic-top"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>

      <a-col
        :span="24"
        :sm="12"
        :lg="6"
        class="item item-yellow mb-3"
      >
        <div class="box-item">
          <div class="box-detail">
            <a-row
              type="flex"
              :gutter="30"
            >
              <a-col flex="auto">
                <div class="txt-number">
                  10
                </div>
                <div class="txt-title">
                  C
                </div>
              </a-col>
              <a-col>
                <font-awesome-icon
                  :icon="['fas', 'eye']"
                  class="ic-top"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>

      <a-col
        :span="24"
        :sm="12"
        :lg="6"
        class="item item-red mb-3"
      >
        <div class="box-item">
          <div class="box-detail">
            <a-row
              type="flex"
              :gutter="30"
            >
              <a-col flex="auto">
                <div class="txt-number">
                  10
                </div>
                <div class="txt-title">
                  D
                </div>
              </a-col>
              <a-col>
                <font-awesome-icon
                  :icon="['fas', 'wine-bottle']"
                  class="ic-top"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/components/overview.scss";
</style>
