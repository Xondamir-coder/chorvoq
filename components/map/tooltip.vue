<template>
	<div class="tooltip" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
		<div class="tooltip__triangle"></div>
		<h2 class="tooltip__title">{{ title }}</h2>
		<p class="tooltip__text">{{ type }}</p>
	</div>
</template>

<script setup>
// Create a reactive object to store the cursor position
const position = ref({ x: 0, y: 0 });

// Function to update the position based on mouse movement
const updatePosition = e => {
	// Offset added so tooltip does not obscure the cursor
	position.value = { x: e.clientX + 10, y: e.clientY + 10 };
};

onMounted(() => {
	window.addEventListener('mousemove', updatePosition);
});

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', updatePosition);
});

defineProps({
	title: String,
	type: String
});
</script>

<style lang="scss" scoped>
.tooltip {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
	background-color: #fff;
	padding: clamp(10px, 1vw, 16px);
	transition: transform 0.3s, opacity 0.3s;
	&__triangle {
		width: 0;
		height: 0;
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		border-right: 16px solid #fff;
		position: absolute;
		left: 0;
		bottom: 8px;
		transform: translateX(-99%);
	}
	&__title {
		font-size: clamp(20px, 1.6vw, 25px);
		letter-spacing: 0.33px;
		color: $clr-secondary-dark;
		font-weight: 700;
	}
	&__text {
		color: rgba(0, 0, 0, 0.4);
		font-weight: 700;
	}
}
</style>
