
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
    title: process.env.npm_package_name || '',
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
    '@/plugins/dd-api-manager',
    '@/plugins/debugger',
    '@/plugins/validations',
    '@/plugins/directive',
    '@/plugins/directives',
    '@/plugins/moment',
    '@/plugins/filters',
    { src: '@/plugins/ck-editor', mode: 'client' },
    '@/plugins/csv'
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
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
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
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      // For less
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
    locales: ['ja', 'en', 'vi'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json'),
        vi: require('./locales/vi.json')
      }
    }
  },

  /*
  ** Nuxt Fontawesome
  ** See https://github.com/nuxt-community/fontawesome-module/
  */
  fontawesome: {
    icons: {
      solid: [
        'faArrowCircleLeft',
        'faArrowLeft',
        'faBalanceScale',
        'faBorderAll',
        'faBoxes',
        'faCalendarAlt',
        'faDownload',
        'faEnvelope',
        'faEraser',
        'faFileAlt',
        'faGlobeAmericas',
        'faHeading',
        'faHome',
        'faInfoCircle',
        'faLock',
        'faPencilAlt',
        'faPlus',
        'faPlusCircle',
        'faSave',
        'faSearch',
        'faSignOutAlt',
        'faTachometerAlt',
        'faThList',
        'faTimes',
        'faTimesCircle',
        'faTrashAlt',
        'faUser',
        'faUserAlt',
        'faUserCircle',
        'faUserFriends',
        'faUsers',
        'faUserTie',
        'faWineBottle',
        'faSitemap',
        'faLink',
        'faEye',
        'faBook',
        'faPager',
        'faChevronDown',
        'faChevronUp',
        'faNetworkWired',
        'faUserCog',
        'faIcons',
        'faListOl',
        'faStream',
        'faAngleDown',
        'faCaretDown'
      ]
    }
  },

  /*
   ** Active router link
   */
  router: {
    // middleware: ['auth'],
    linkActiveClass: 'active-link'
  },

  /**
   * Nuxt Auth
   * See https://auth.nuxtjs.org/
   */
  auth: {
    // redirect: {
    //   login: '/login',
    //   logout: '/login',
    //   home: '/profile',
    //   user: '/profile'
    // },
    // strategies: {
    //   local: {
    //     endpoints: {
    //       login: { url: '/api/login', method: 'post', propertyName: 'data.api_token' },
    //       user: { url: '/api/me', method: 'get', propertyName: 'data' },
    //       logout: false
    //     }
    //   },
    //   tokenRequired: false,
    //   tokenType: false
    // }
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      user: '/'
    },
    strategies: {
      password_grant: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/oauth/token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: false,
          user: {
            url: 'api/me',
            propertyName: 'data'
          }
        }
      },
      password_grant_custom: {
        _scheme: '~/auth/schemes/PassportPasswordScheme.js',
        client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
        client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
        endpoints: {
          login: {
            url: '/oauth/token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: false,
          user: {
            url: 'api/me',
            propertyName: 'data'
          }
        }
      },
      'laravel.passport': {
        url: process.env.LARAVEL_ENDPOINT,
        client_id: process.env.PASSPORT_CLIENT_ID,
        client_secret: process.env.PASSPORT_CLIENT_SECRET,
        userinfo_endpoint: process.env.LARAVEL_ENDPOINT + '/api/oauth/me'
      }
    }
  }
}
