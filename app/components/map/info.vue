<template>
	<ModalContainer v-model="isOverlayClosed">
		<p>hello</p>
	</ModalContainer>
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
