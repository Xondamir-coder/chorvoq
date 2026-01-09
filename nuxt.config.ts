// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
             @use "~/assets/scss/abstracts/_variables.scss" as *; 
             @use "~/assets/scss/abstracts/_mixins.scss" as *;`
        }
      }
    }
  },
  app: {
    head: {
      titleTemplate: '%s | Chorvoq Darvozasi',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ]
    }
  },
  seo: {
    meta: {
      author: 'https://spacelabs.studio',
      publisher: 'Spacelabs'
    }
  },
  i18n: {
    defaultLocale: 'en',
    baseUrl: 'https://www.chorvoqdarvozasi.uz/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Русский',
        file: 'ru.json'
      },
      {
        code: 'uz',
        language: 'uz-UZ',
        name: "O'zbekcha",
        file: 'uz.json'
      }
    ]
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/seo']
});
