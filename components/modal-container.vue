<template>
	<Teleport to="body">
		<Transition name="fade">
			<div class="modal-container" @click.self="model = false" v-if="model">
				<slot />
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
const model = defineModel();
</script>

<style lang="scss" scoped>
.modal-container {
	background-color: #00000099;
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100%;
	z-index: 150;
	@include flex-center;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
