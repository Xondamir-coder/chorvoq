<template>
	<section class="map" id="home-map">
		<img src="~/assets/images/buildings.jpg" alt="buildings map" class="map__image" />
		<div class="map__overlay"></div>
		<div class="map__buttons">
			<button class="map__button">{{ $t('select-apartment') }}</button>
			<a href="tel:+998 71 210 44 54" class="map__button">{{ $t('contact-us') }}</a>
		</div>
		<div class="map__production">
			<span>{{ $t('developed-by') }}</span>
			<VectorsDiscoverInvest class="map__logo" />
		</div>
	</section>
</template>

<script setup>
onMounted(() => {
	GSAPAnimation('#home-map .map__button', {
		animProps: { y: 20, stagger: 0.2 },
		scrollTriggerOptions: { trigger: '#home-map .map__buttons' }
	});
	GSAPAnimation('#home-map .map__production>*', {
		animProps: { y: -20, stagger: 0.1 },
		scrollTriggerOptions: { trigger: '#home-map .map__production' }
	});
});
</script>

<style lang="scss" scoped>
.map {
	display: grid;
	margin-block: clamp(100px, 10vw, 150px);
	&__image {
		@media only screen and (max-width: $bp-md) {
			aspect-ratio: 482/800;
		}
	}
	&__button {
		flex: 1;
		padding-inline: 20px;
		padding-block: 8px;
		font-size: 15px;
		border: 2px solid;
		line-height: 1.6;
		transition: background-color 0.3s, border-color 0.3s, color 0.3s;
		text-align: center;
		text-wrap: nowrap;
		animation: 0.3s 0.3s backwards;
		@media only screen and (min-width: $bp-md) {
			max-width: fit-content;
		}
		&:first-child {
			border-color: transparent;
			background-color: $clr-primary;
			animation-name: slide-from-left;
			&:hover {
				background-color: rgba($clr-primary, 0.4);
				border-color: $clr-primary;
			}
		}
		&:last-child {
			animation-name: slide-from-right;
			background-color: transparent;
			border-color: $clr-primary;
			&:hover {
				border-color: transparent;
				background-color: $clr-primary;
			}
		}
	}
	&__buttons {
		display: flex;
		gap: clamp(16px, 3.5vw, 53px);
	}
	&__overlay {
		background: #03030352;
		border: 1px solid #ffffff26;
		backdrop-filter: blur(10px);
	}
	& > * {
		grid-area: 1/1/2/2;
	}
	&__buttons {
		place-self: center;
		z-index: 1;
	}
	&__production {
		z-index: 1;
		justify-self: center;
		align-self: flex-end;
		padding-bottom: clamp(24px, 2.2vw, 34px);
		display: flex;
		align-items: center;
		gap: 19px;
	}
	&__logo {
		width: 122px;
		--clr-text: #fff;
	}
}
</style>
