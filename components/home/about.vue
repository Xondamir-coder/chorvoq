<template>
	<section class="about" id="home-about">
		<div class="about__top">
			<div class="about__top-left" ref="topLeftRef">
				<h3 class="about__top-label">{{ $t('route-about') }}</h3>
				<h2 class="about__top-title">
					{{ $t('home-about-top-title') }}
				</h2>
			</div>
			<p class="about__top-text" ref="topTextRef">{{ $t('home-about-top-text') }}</p>
		</div>
		<div class="about__center">
			<ul class="about__details" ref="detailsRef">
				<li class="about__detail" v-for="detail in details" :key="detail.label">
					<h3 class="about__detail-amount">{{ detail.amount }}</h3>
					<p class="about__detail-label">{{ detail.label }}</p>
				</li>
			</ul>
		</div>
		<div class="about__bottom">
			<VectorsBgPattern class="about__pattern" />
			<div
				class="about__mission"
				v-for="mission in missions"
				:key="mission.title"
				ref="missionsRef">
				<h4 class="about__mission-label">{{ mission.label }}</h4>
				<h3 class="about__mission-title">{{ mission.title }}</h3>
				<p class="about__mission-text">{{ mission.text }}</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { t, locale } = useI18n();

const details = computed(() => [
	{
		amount: `24,5 ${t('hectar')}`,
		label: t('home-about-detail-1')
	},
	{
		amount: '1700+',
		label: t('home-about-detail-2')
	},
	{
		amount: '85 000',
		label: t('home-about-detail-3')
	}
]);
const missions = computed(() => [
	{
		label: t('home-about-mission-1-label'),
		title: t('home-about-mission-1-title'),
		text: t('home-about-mission-1-text')
	},
	{
		label: t('home-about-mission-2-label'),
		title: t('home-about-mission-2-title'),
		text: t('home-about-mission-2-text')
	}
]);

const topLeftRef = ref();
const topTextRef = ref();
const detailsRef = ref();
const missionsRef = ref();
let animations;

const startAnimations = () => {
	animations = [
		GSAPAnimation(detailsRef.value.children, {
			animProps: { y: 25, stagger: 0.1 }
		}),
		GSAPAnimation(missionsRef.value, {
			animProps: { y: 35, stagger: 0.1 }
		})
	];
};

onMounted(() => {
	GSAPAnimation(topLeftRef.value, {
		animProps: { x: -75 }
	});
	GSAPAnimation(topTextRef.value, {
		animProps: { x: 75 }
	});
	startAnimations();
});

watch(locale, async () => {
	animations.forEach(animation => {
		if (animation.scrollTrigger) {
			animation.scrollTrigger.kill();
		}
		animation.kill();
	});
	animations = [];
	await nextTick();
	ScrollTrigger.refresh();
	startAnimations();
});
</script>

<style lang="scss" scoped>
.about {
	display: flex;
	flex-direction: column;
	&__detail {
		display: flex;
		flex-direction: column;
		gap: 5px;
		&-label {
			line-height: normal;
		}
		&-amount {
			font-weight: 700;
			font-size: clamp(24px, 3vw, 45px);
			letter-spacing: -2px;
		}
	}
	&__details {
		background-color: $clr-primary;
		align-self: flex-end;
		display: flex;
		gap: clamp(20px, 3.6vw, 55px);
		margin-left: clamp(50px, 7.2vw, 109px);
		padding-inline: clamp(20px, 3.8vw, 57px);
		padding-block: clamp(11px, 2.1vw, 32px);
		@media only screen and (max-width: $bp-md) {
			margin-left: 0;
			width: 100%;
			justify-content: center;
			text-align: center;
		}
	}
	&__center {
		background-image: url('~/assets/images/shops.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		aspect-ratio: 1280/444;
		display: flex;
		margin-inline: $layout-spacing;

		@media only screen and (max-width: $bp-md) {
			margin-inline: 0;
			aspect-ratio: 480/600;
		}
	}
	&__top {
		overflow: hidden;
		align-self: flex-end;
		display: flex;
		column-gap: clamp(16px, 2vw, 32px);
		row-gap: 30px;
		padding-inline: $layout-spacing;

		@media only screen and (max-width: $bp-md) {
			padding-top: 50px;
			flex-direction: column;
			margin-bottom: 40px;
		}
		@media only screen and (min-width: $bp-md) {
			transform: translateY(68px);
			margin-left: min(76px, 5vw);
			margin-right: min(38px, 2.5vw);
		}
		&-label {
			letter-spacing: 3px;
			text-transform: uppercase;
			font-weight: 400;
		}
		&-text {
			color: $clr-primary;
			@media only screen and (max-width: $bp-md) {
				padding-inline: 10px;
			}
			@media only screen and (min-width: $bp-md) {
				max-width: 46ch;
				align-self: center;
			}
		}
		&-title {
			font-size: clamp(30px, 3vw, 46px);
			letter-spacing: -2px;
		}
		&-left {
			backdrop-filter: blur(30px);
			background-color: rgba($clr-primary, 0.7);
			padding-block: clamp(30px, 4.2vw, 64px);
			padding-inline: clamp(18px, 4.2vw, 64px);
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}
	&__mission {
		display: flex;
		flex-direction: column;
		gap: 16px;
		&:last-child .about__mission-title {
			max-width: 20ch;
		}
		&-label {
			text-transform: uppercase;
			font-weight: 400;
		}
		&-title {
			font-weight: 700;
			font-size: 28px;
			letter-spacing: -1px;
		}
	}
	&__bottom {
		overflow: hidden;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: clamp(40px, 4.3vw, 65px);
		margin-inline: $layout-spacing;
		background-color: $clr-secondary;
		position: relative;
		padding-block: clamp(50px, 4.6vw, 70px);
		padding-inline: min(108px, 7.2vw);
		@media only screen and (max-width: $bp-md) {
			padding-inline: $layout-spacing;
			margin-inline: 0;
		}
	}
	&__pattern {
		position: absolute;
		inset: 0;
		width: 105%;
		pointer-events: none;
	}
}
</style>
