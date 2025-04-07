<template>
	<div class="layout">
		<Header />
		<slot />
		<Footer />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
