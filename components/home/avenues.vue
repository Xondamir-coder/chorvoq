<template>
	<section id="home-avenues" class="avenues">
		<h2 class="section-title">{{ $t('home-avenues-title') }}</h2>
		<ul class="avenues__list">
			<li class="avenues__item" v-for="avenue in avenues" :key="avenue.title">
				<img :src="avenue.img" :alt="avenue.title" class="avenues__item-image" />
				<div class="avenues__item-gradient">
					<h3 class="avenues__item-title">{{ avenue.title }}</h3>
				</div>
			</li>
		</ul>
	</section>
</template>

<script setup>
import img1 from '~/assets/images/avenue-1.avif';
import img2 from '~/assets/images/avenue-2.avif';
import img3 from '~/assets/images/avenue-3.avif';
import img4 from '~/assets/images/avenue-4.avif';
import img5 from '~/assets/images/avenue-5.avif';
import img6 from '~/assets/images/avenue-6.avif';

const { t } = useI18n();

const avenues = computed(() => [
	{
		img: img1,
		title: t('managing-company')
	},
	{
		img: img2,
		title: t('street-retail')
	},
	{
		img: img3,
		title: t('hotel')
	},
	{
		img: img4,
		title: t('waterpark')
	},
	{
		img: img5,
		title: t('parking')
	},
	{
		img: img6,
		title: t('gated-yard')
	}
]);

onMounted(() => {
	document.querySelectorAll('#home-avenues .avenues__item').forEach(item => {
		GSAPAnimation(item, {
			animProps: { y: -25 }
		});
	});
});
</script>

<style lang="scss" scoped>
.avenues {
	padding-inline: $layout-spacing;
	display: flex;
	flex-direction: column;
	gap: clamp(30px, 4vw, 60px);
	padding-top: clamp(50px, 6.4vw, 97px);

	@media only screen and (max-width: $bp-md) {
		padding-inline: 0;
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(clamp(300px, 40vw, 600px), 1fr));
		gap: 30px;
	}
	&__item {
		display: grid;
		&::after {
			content: '';
			background-color: rgba(0, 0, 0, 0.2);
			grid-area: 1/1/2/2;
		}
		& > * {
			grid-area: 1/1/2/2;
		}
		&-image {
			height: 100%;
			aspect-ratio: 625/513;
			@media only screen and (max-width: $bp-md) {
				aspect-ratio: 482/513;
			}
		}
		&-gradient {
			background: #ffffff0d;
			border: 1px solid #ffffff26;
			backdrop-filter: blur(30px);
			align-self: flex-end;
			margin: clamp(22px, 2.1vw, 32px);
			padding-block: 12px;
			text-align: center;
		}
		&-title {
			font-size: clamp(18px, 1.4vw, 22px);
			font-weight: 300;
		}
	}
}
</style>
