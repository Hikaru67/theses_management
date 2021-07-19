import icons from './configs/icons'

require('dotenv').config()

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  mode: 'spa',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'PS MAN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Style resources
  ** See https://github.com/nuxt-community/style-resources-module
  */
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/less/theme.less', lang: 'less' },
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/api',
    '@/plugins/directive',
    '@/plugins/filter',
    '@/plugins/util'
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/moment'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    'nuxt-i18n'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  /*
  ** Nuxt i18n
  ** See https://i18n.nuxtjs.org/
  */
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'vi', iso: 'vi-VN' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        vi: require('./locales/vi.json')
      },
      silentTranslationWarn: true
    }
  },

  /*
  ** Nuxt Fontawesome
  ** See https://github.com/nuxt-community/fontawesome-module/
  */
  fontawesome: {
    icons
  },

  /*
   ** Active router link
   */
  router: {
    linkActiveClass: 'active-link'
  },

  /**
   * Nuxt Auth
   * See https://auth.nuxtjs.org/
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/theses',
      user: '/profile'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          user: { url: '/me', method: 'get', propertyName: false },
          logout: { url: '/logout', method: 'get' }
        }
      }
    },
    plugins: [
      '@/plugins/api.js'
    ]
  }
}
