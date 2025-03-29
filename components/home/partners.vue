<template>
	<section id="home-partners" class="partners">
		<div class="partners__content">
			<span>{{ $t('ours') }}</span>
			<h4>{{ $t('partners') }}</h4>
		</div>
		<div class="partners__list">
			<VectorsDiscoverInvest class="partners__item" />
			<img src="~/assets/images/dream-city.avif" alt="dream city" class="partners__item" />
			<VectorsPrimeTower class="partners__item" />
			<VectorsOzguven class="partners__item" />
		</div>
	</section>
</template>

<script setup>
onMounted(() => {
	GSAPAnimation('#home-partners .partners__item', {
		animProps: { scale: 0.7, stagger: 0.15 },
		scrollTriggerOptions: { trigger: '#home-partners .partners__list' }
	});
});
</script>

<style lang="scss" scoped>
.partners {
	display: flex;
	gap: clamp(30px, 6.3vw, 95px);
	padding-inline: $layout-spacing;
	margin-block: clamp(40px, 8.7vw, 130px);
	@media only screen and (max-width: $bp-sm) {
		flex-direction: column;
	}
	&__list {
		display: flex;
		justify-content: space-between;
		flex: 1;
		@media only screen and (max-width: $bp-sm) {
			display: grid;
			gap: 30px;
			@include grid-scroll(max-content);
		}
	}
	&__content {
		span {
			font-size: 14px;
			line-height: 1.42;
			color: rgba($clr-grey, 0.6);
			text-transform: lowercase;
		}
		h4 {
			font-weight: 700;
			font-size: clamp(20px, 1.6vw, 24px);
			line-height: 1.33;
			color: $clr-grey;
		}
	}
	&__item {
		width: clamp(100px, 11vw, 165px);
		--clr-text: #201e1e;
	}
}
</style>
