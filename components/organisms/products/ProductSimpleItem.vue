<template>
  <div class="product-simple-item">
    <h4 class="txt-title">
      {{ fromModule === 'pre-orders' ? 'Pre-' : '' }}{{ product.title }}
    </h4>

    <div class="box-main">
      <div class="row">
        <div class="col-4 box-thumb">
          <div
            class="img"
            :style="{ backgroundImage: `url('${product.image ? product.image : product.galleryURL}')` }"
          />
        </div>

        <div class="col-8 box-detail">
          <div class="box-wrap">
            <div v-if="!isCompare" class="txt-price">
              Price: ¥{{ product.buy_now_price ? product.buy_now_price : product.price }}
            </div>
            <div v-else class="txt-price">
              Price: ${{ product.currentPrice ? product.currentPrice : product.convertedCurrentPrice }}
            </div>
            <!-- <div class="txt-sku">
              UPC: {{ product.upc }}
            </div> -->
          </div>

          <div class="box-btn">
            <div class="row align-items-end">
              <div class="col" />

              <div class="col-auto text-right">
                <CButton
                  type="button"
                  color="outline-primary"
                  size="sm"
                  @click="onAction(product)"
                >
                  {{ actionButtonText }}
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-simple-item {
  /deep/ {
    margin-bottom: 30px;
    @include mq(max_xs) {
      margin-bottom: 20px;
    }
    .txt-title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14px;
      margin-bottom: 5px;
      @include mq(max_xs) {
        font-size: 13px;
      }
    }
    .box-thumb {
      padding-right: 0;
      .img {
        display: block;
        width: 100%;
        height: auto;
        background-color: #ebedef;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        padding-bottom: 100%;
      }
    }
    .box-detail {
      display: flex;
      flex-direction: column;
      > * {
        flex: 0 0 auto;
      }
    }
    .txt-price {
      color: #e55353;
    }
    .txt-sku {
      color: #b2b3b6;
    }
    .box-wrap {
      flex: 1 1 auto;
    }
    .box-btn {
      border-top: 1px solid #e6e6e6;
      padding-top: 5px;
      margin-top: 10px;
    }
  }
}
</style>

<script>
const EVENT_ACTION = 'action'

export default {
  props: {
    /**
     * Product item
     */
    product: {
      type: Object,
      default: () => {}
    },

    /**
     * Action button text
     */
    actionButtonText: {
      type: String,
      default: '出品'
    },

    /**
     * from module
     */
    fromModule: {
      type: String,
      default: ''
    },

    /**
     * is compare
     */
    isCompare: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    /**
     * Action
     */
    onAction(product) {
      this.$emit(EVENT_ACTION, product)
    }
  }
}
</script>
