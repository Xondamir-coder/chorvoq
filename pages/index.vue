<template>
	<main class="home">
		<HomeHero />
		<HomeAbout />
		<HomeApartments />
		<HomeAdvantages />
		<HomeAvenues />
		<HomePartners />
		<HomeOffer />
		<HomeMap />
		<HomeContact />
		<HomeMessage />
	</main>
</template>

<script setup>
const { t } = useI18n();

// TODO: SEO
useHead({
	title: t('route-home'),
	meta: [
		{
			content: t('seo-home-desc'),
			name: 'description'
		},
		{
			name: 'keywords',
			content: [
				'Chorvoq Darvozasi',
				'Tashkent Region apartments',
				'new residential complex Uzbekistan',
				'modern living Tashkent',
				'Chorvoq real estate',
				'buy apartment Tashkent region',
				'Chorvoq Darvozasi investment',
				'family apartments Tashkent'
			].join(', ')
		}
	]
});
</script>

<style lang="scss" scoped></style>
