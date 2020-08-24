<template>
  <div>
    <a-dropdown
      overlay-class-name="dropdown-language"
      :trigger="['click']"
    >
      <a
        class="ant-dropdown-link"
        @click="e => e.preventDefault()"
      >
        <img
          :src="require(`~/assets/images/ic_flag_${currentLocale}.png`)"
          width="28"
        />
        <font-awesome-icon icon="caret-down" />
      </a>

      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a
            href="#"
            @click="changeLocale('en-US')"
          >
            <img src="~/assets/images/ic_flag_en-US.png" />
          </a>
        </a-menu-item>

        <a-menu-item key="2">
          <a
            href="#"
            @click="changeLocale('ja-JP')"
          >
            <img src="~/assets/images/ic_flag_ja-JP.png" />
          </a>
        </a-menu-item>

        <a-menu-item key="3">
          <a
            href="#"
            @click="changeLocale('vi-VN')"
          >
            <img src="~/assets/images/ic_flag_vi-VN.png" />
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters('i18n', ['getLocale']),

    /**
     * Get current locale
     */
    currentLocale() {
      // TODO
      // return this.getLocale

      return 'en-US'
    }
  },

  methods: {
    ...mapActions('i18n', ['setLocale']),

    /**
     * Change locale
     */
    changeLocale(locale) {
      this.setLocale(locale)
    }
  }
}
</script>
