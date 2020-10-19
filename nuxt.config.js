const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/overwatch-team-composition-generator/'
        }
      }
    : {};

const title = 'Overwatch Team Composition Generator'; // SPA has some issues with process.env.title

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '', // SPA fix
    titleTemplate: (titleChunk) => {
      return titleChunk
        ? `${titleChunk} - ${process.env.title}`
        : `${process.env.title || 'Overwatch Team Composition Generator'}`; // SPA fix
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'apple-mobile-web-app-title',
        content: title
      },
      {
        name: 'application-name',
        content: title
      },
      {
        name: 'msapplication-TileColor',
        content: '#ff9c00'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Teko|Roboto|Roboto+Condensed|Material+Icons&display=swap'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: routerBase.router ? routerBase.router.base + 'apple-touch-icon.png' : '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: routerBase.router ? routerBase.router.base + 'favicon-32x32.png' : '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: routerBase.router ? routerBase.router.base + 'favicon-16x16.png' : '/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: routerBase.router ? routerBase.router.base + 'site.webmanifest' : '/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        color: '#ff9c00',
        href: routerBase.router ? routerBase.router.base + 'safari-pinned-tab.svg' : '/safari-pinned-tab.svg'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/LoadingOverlay.vue',
  /*
   ** Global CSS
   */
  css: ['normalize.css', '~assets/fonts/Metropolis.scss', '~assets/scss/variables.scss', '~assets/scss/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/material-components-vue.ts', mode: 'client' },
    { src: '~/plugins/modernizr.js', mode: 'client' }
    // { src: '~/node_modules/vue-compare-image', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@aceforth/nuxt-optimized-images'],
  optimizedImages: {
    optimizeImages: true
  },
  /*
   ** Build configuration
   */
  env: {
    title: 'Overwatch Team Composition Generator',
    author_name: process.env.npm_package_author_name,
    author_url: process.env.npm_package_author_url
  },
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend() {},
    loaders: {
      scss: {
        sassOptions: {
          includePaths: ['node_modules']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0'
  },
  layoutTransition: {
    name: 'layout'
  },
  loadingIndicator: '',
  ...routerBase
};
