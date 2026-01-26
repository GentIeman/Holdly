// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: false},
    modules: [
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxt/eslint',
        '@nuxt/content',
    ],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        }
    },
    routeRules: {
        '/': {redirect: '/bookmarks'}
    },
    runtimeConfig: {
        public: {
            strapiOrigin: ""
        }
    },
    ssr: false
})