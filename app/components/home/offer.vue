<template>
	<section class="offer" id="home-offer">
		<img src="~/assets/images/home-offer.avif" alt="shops banner" class="offer__image" />
		<div class="offer__content">
			<h3 class="offer__label">{{ $t('easy-cheap') }}</h3>
			<h2 class="offer__title">{{ $t('home-offer-title') }}</h2>
			<p class="offer__text">{{ $t('home-offer-text') }}</p>
			<button class="offer__button" @click="showModal = true">{{ $t('contact-us') }}</button>
		</div>
	</section>
	<ModalForm v-model="showModal" />
</template>

<script setup>
const showModal = ref(false);

onMounted(() => {
	const parentPrefix = '#home-offer .offer';
	GSAPAnimation(`${parentPrefix}__image`, {
		animProps: { x: -20 }
	});
	GSAPAnimation(`${parentPrefix}__content`, {
		animProps: { x: 20 }
	});
});
</script>

<style lang="scss" scoped>
.offer {
	display: grid;
	overflow: hidden;

	@media only screen and (min-width: $bp-md) {
		padding-inline: $layout-spacing;
		display: grid;
		grid-template-columns: 1fr 0.5fr 0.5fr;
	}

	&__image {
		height: 100%;
		aspect-ratio: 480/504;

		@media only screen and (min-width: $bp-md) {
			grid-row: 1 / span 1;
			grid-column: 1 / span 2;
			aspect-ratio: 949/705;
		}
	}
	&__label {
		text-transform: uppercase;
		font-weight: 600;
		font-size: 1.1rem;
	}
	&__button {
		margin-top: clamp(40px, 4.7vw, 71px);
		font-weight: 700;
		background-color: $clr-primary;
		transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
		padding-block: 16px;
		padding-inline: 49px;
		color: #fff;
		align-self: flex-start;
		@media only screen and (max-width: $bp-md) {
			align-self: center;
		}
		&:hover {
			background-color: #fff;
			color: $clr-primary;
			box-shadow: 0px 10px 30px 0px rgba($clr-primary, 0.3);
		}
	}
	&__text {
		color: $clr-grey;
		margin-top: clamp(16px, 2.4vw, 36px);
		@media only screen and (min-width: $bp-md) {
			max-width: 43ch;
		}
	}
	&__title {
		font-weight: 700;
		font-size: clamp(40px, 3.2vw, 48px);
		letter-spacing: -2px;
		margin-top: clamp(16px, 1.6vw, 24px);
		@media only screen and (min-width: $bp-md) {
			max-width: 12ch;
		}
	}
	&__content {
		z-index: 2;
		display: flex;
		flex-direction: column;
		color: $clr-tertiary;
		background-color: #fff;
		padding: clamp(20px, 5.3vw, 80px);
		padding-bottom: 20px;
		align-self: flex-end;
		order: -1;
		@media only screen and (max-width: $bp-md) {
			text-align: center;
			align-items: center;
			margin-bottom: 30px;
		}
		@media only screen and (min-width: $bp-md) {
			order: initial;
			grid-row: 1 / span 1;
			grid-column: 2 / span 2;
		}
	}
}
</style>
