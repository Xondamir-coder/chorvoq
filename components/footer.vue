<template>
	<footer class="footer" id="footer" v-if="!isPlan">
		<VectorsLogo class="footer__logo" />
		<nav class="footer__nav">
			<a
				class="footer__nav-link"
				v-for="link in routingLinks"
				:key="link.to"
				:href="link.to"
				@click.prevent="navigateSection(link.to)">
				{{ link.label }}
			</a>
		</nav>
		<div class="footer__copyright">
			<p class="footer__copyright-text">{{ $t('location-address') }}</p>
			<a class="footer__copyright-text" href="mailto:Chorvok@gmail.com ">
				Chorvok@gmail.com
			</a>
		</div>
		<div class="footer__social">
			<a href="#" target="_blank">
				<IconsFacebookCircular class="footer__icon" />
			</a>
			<a href="#" target="_blank">
				<IconsTwitter class="footer__icon" />
			</a>
			<a href="#" target="_blank">
				<IconsInstagramOutlined class="footer__icon" />
			</a>
			<a href="#" target="_blank">
				<IconsLinkedin class="footer__icon" />
			</a>
		</div>
	</footer>
</template>

<script setup>
const { routingLinks } = useConstants();
const route = useRoute();
const router = useRouter();
const { $lenis } = useNuxtApp();

const isPlan = computed(() => route.name.includes('_id') || route.name.includes('genplan'));

const navigateSection = to => {
	if (route.name !== 'index') router.push({ path: '/', hash: to === '#' ? '' : to });
	else $lenis.scrollTo(to === '#' ? 0 : to);
};
onMounted(() => {
	const footer = document.querySelector('#footer');
	if (!footer) return;
	Array.from(footer).forEach(el => {
		GSAPAnimation(el, {
			animProps: { y: 20 },
			scrollTriggerOptions: { scrub: false, toggleActions: 'play none none reverse' }
		});
	});
});
</script>

<style lang="scss" scoped>
.footer {
	background-color: $clr-tertiary;
	padding-inline: $layout-spacing;
	padding-block: 30px;
	display: grid;
	grid-template-areas:
		'logo nav'
		'copyright social';
	row-gap: clamp(70px, 6.8vw, 102px);
	@media only screen and (min-width: $bp-md) {
		grid-auto-columns: max-content;
		justify-content: space-between;
	}
	@media only screen and (max-width: $bp-md) {
		padding-block: 56px;
		grid-template-areas:
			'nav logo'
			'social social'
			'copyright copyright';
	}
	&__copyright {
		opacity: 0.7;
		grid-area: copyright;
		display: flex;
		flex-direction: column;
		gap: 8px;
		@media only screen and (max-width: $bp-sm) {
			gap: 16px;
		}
		&-text {
			font-size: 16px;
			@media only screen and (max-width: $bp-sm) {
				font-size: 20px;
			}
		}
	}
	&__nav {
		grid-area: nav;
		display: flex;
		flex-wrap: wrap;
		gap: clamp(20px, 3vw, 45px);
		@media only screen and (max-width: $bp-sm) {
			font-size: 22px;
		}
		&-link {
			transition: color 0.3s;
			&:hover {
				color: $clr-primary;
			}
		}
	}
	&__social {
		grid-area: social;
		display: flex;
		gap: 26px;
		@media only screen and (min-width: $bp-sm) {
			place-self: flex-end;
		}
		@media only screen and (max-width: $bp-sm) {
			justify-content: space-evenly;
		}
	}
	&__icon {
		width: 16px;
		fill: $clr-grey;
		transition: fill 0.3s;
		@media only screen and (max-width: $bp-sm) {
			width: 40px;
		}
		&:hover {
			fill: $clr-primary;
		}
	}
	&__logo {
		grid-area: logo;
		width: 183px;
	}
}
</style>
