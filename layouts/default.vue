<template>
	<div class="layout">
		<Preloader />
		<Header />
		<slot />
		<Footer />
		<!-- <ModalContainer
			v-model="showHint"
			>
			<div class="modal">
				<IconsHand class="modal__hand" />
				<div class="modal__content">
					<h2 class="modal__title">{{ $t('full-render') }}</h2>
					<p class="modal__text">{{ $t('render-text') }}</p>
				</div>
				<button class="modal__button" @click="showHint = false">ok</button>
			</div>
		</ModalContainer> -->
	</div>
</template>

<script setup>
const { $lenis } = useNuxtApp();
if (import.meta.client) {
	$lenis.stop();
}
useHead({
	bodyAttrs: {
		class: 'overflow-hidden'
	}
});
</script>

<style lang="scss" scoped>
.layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.modal {
	background-color: #fff;
	padding-inline: 19px;
	padding-block: 40px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-radius: 18px;
	&__hand {
		align-self: center;
	}
	&__button {
		background-color: $clr-secondary;
		padding-block: 20px;
		font-weight: 700;
		font-size: 12px;
		line-height: 10px;
		letter-spacing: 0.22px;
		text-align: center;
		text-transform: uppercase;
	}
	&__content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	&__title {
		color: #382711;
		font-weight: 700;
		font-size: 26px;
		line-height: 32px;
		text-align: center;
	}
	&__text {
		color: #40494c;
		font-weight: 700;
		font-size: 10px;
		line-height: 16px;
		text-align: center;
	}
}
</style>
