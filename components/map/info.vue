<template>
	<Transition name="fade">
		<div class="overlay" v-if="!isOverlayClosed" @click="isOverlayClosed = true">
			<img
				class="overlay__image"
				src="~/assets/images/map-info.png"
				alt="info banner"
				width="372"
				height="336" />
		</div>
	</Transition>
</template>

<script setup>
const isOverlayClosed = ref(false);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.overlay {
	position: fixed;
	inset: 0;
	z-index: 101;
	width: 100%;
	height: 100%;
	display: grid;
	place-content: center;
	background: #2261924d;
	@media only screen and (min-width: $bp-lg) {
		display: none;
	}
	&__image {
		object-fit: contain;
		width: 90%;
		justify-self: center;
	}
}
</style>
