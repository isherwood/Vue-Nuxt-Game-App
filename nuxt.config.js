export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-gaming',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  bootstrapVue: {
    icons: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'http://161.35.15.14/api/tokens',
            method: 'post',
            propertyName: 'auth_token'
          },
          logout: {
            url: '/auth/token/logout/',
            method: 'post'
          },
          // user: {
          //   url: '/auth/users/me/',
          //   method: 'get',
          //   propertyName: false
          // }
        },
        tokenRequired: true,
        tokenType: 'Token',
        tokenName: 'Authorization'
      }
    },
    token: {
      prefix: '_token.',
      global: true,
    }
  }
}
