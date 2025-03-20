<template>
	<section class="contact" id="home-contact">
		<div class="contact__top">
			<h3 class="contact__label">{{ $t('contacts') }}</h3>
			<h2 class="contact__title">{{ $t('contact-us') }}</h2>
			<p class="contact__text">{{ $t('home-contact-text') }}</p>
		</div>
		<div class="contact__main">
			<VectorsStarGroupedPattern class="contact__pattern" />
			<div class="contact__map">
				<img src="~/assets/images/location-1.jpg" alt="map" class="contact__map-image" />
				<h2 class="contact__map-title">{{ $t('home-contact-title') }}</h2>
			</div>
		</div>
	</section>
</template>

<script setup>
onMounted(() => {
	const parentPrefix = '#home-contact .contact';
	GSAPAnimation(`${parentPrefix}__top>*`, {
		animProps: { y: 20, stagger: 0.1 },
		scrollTriggerOptions: { trigger: `${parentPrefix}__top` }
	});
	GSAPAnimation(`${parentPrefix}__map`, {
		animProps: { scale: 0.95 }
	});
	GSAPAnimation(`${parentPrefix}__pattern path`, {
		animProps: { rotation: -45, stagger: 0.05 },
		scrollTriggerOptions: { trigger: `${parentPrefix}__pattern` }
	});
});
</script>

<style lang="scss" scoped>
.contact {
	display: flex;
	flex-direction: column;
	gap: clamp(70px, 6.6vw, 100px);
	&__map {
		padding-inline: $layout-spacing;
		z-index: 2;
		position: relative;
		display: grid;
		& > * {
			grid-area: 1/1/2/2;
		}
		&-image {
			@media only screen and (max-width: $bp-md) {
				aspect-ratio: 440/425;
			}
		}
		&-title {
			background-color: #fff;
			place-self: flex-end;
			font-weight: 700;
			font-size: clamp(22px, 2.5vw, 38px);
			line-height: 1.68;
			letter-spacing: -2px;
			color: $clr-primary;
			padding-block: 17px;
			padding-inline: 40px;
			@media only screen and (max-width: $bp-md) {
				justify-self: center;
				padding-block: 12px;
			}
		}
	}
	&__main {
		position: relative;
		overflow-x: clip;
	}
	&__pattern {
		position: absolute;
		right: -10%;
		top: -10%;
		z-index: 1;
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__label {
		text-transform: uppercase;
		font-weight: 700;
	}
	&__title {
		margin-top: 8px;
		font-size: clamp(40px, 3.6vw, 55px);
		line-height: 1.1;
		letter-spacing: -2px;
	}
	&__text {
		align-self: center;
		max-width: 49ch;
		margin-top: clamp(20px, 1.6vw, 24px);
		text-align: center;
		color: $clr-grey;
		font-weight: 400;
	}
	&__top {
		color: $clr-tertiary;
		font-weight: 700;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
}
</style>
