<template>
	<div class="layout">
		<Preloader />
		<Header />
		<slot />
		<Footer />
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
</style>
