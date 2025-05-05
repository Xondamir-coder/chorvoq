// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "~/assets/styles/abstracts/_variables.scss" as *; @use "~/assets/styles/abstracts/_mixins.scss" as *;'
				}
			}
		}
	},
	app: {
		head: {
			titleTemplate: '%s | Chorvoq Darvozasi',
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
		}
	},
	site: {
		url: 'https://chorvoqdarvozasi.uz',
		name: 'Chorvoq Darvozasi',
		description:
			'Find and compare apartments effortlessly—browse curated listings, explore high-resolution photos and floor plans, view detailed amenities, and download professional PDF brochures to make your next move with confidence.'
	},
	css: [
		'~/assets/styles/main.scss' // Replace with the path to your SCSS file
	],
	i18n: {
		locales: [
			{ code: 'en', iso: 'en-US', name: 'English' },
			{ code: 'ru', iso: 'ru-RU', name: 'Русский' },
			{ code: 'uz', iso: 'uz-UZ', name: "O'zbek" }
		],
		defaultLocale: 'en',
		vueI18n: '~/locales/i18n.config.js'
	},
	modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxtjs/seo']
});
